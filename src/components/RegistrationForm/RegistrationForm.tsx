import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';

interface Position {
  id: number;
  name: string;
}

interface RegistrationFormProps {
  onRegister: () => void;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  photo?: string;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState<number | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    const fetchPositions = async () => {
      const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
      const data = await response.json();
      setPositions(data.positions);
    };

    fetchPositions();
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token');
      const data = await response.json();
      setToken(data.token);
    };

    fetchToken();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: Errors = {};

    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!phone) newErrors.phone = 'Phone is required';
    if (!photo) newErrors.photo = 'Photo is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('position_id', position?.toString() || '');
    formData.append('photo', photo!);

    const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
      method: 'POST',
      headers: {
        'Token': token
      },
      body: formData
    });

    if (response.ok) {
      alert('User registered successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setPosition(null);
      setPhoto(null);
      setErrors({});
      onRegister();
    } else {
      const errorData = await response.json();
      const serverErrors: Errors = {};

      if (errorData.fails) {
        for (const [field, messages] of Object.entries(errorData.fails)) {
          serverErrors[field as keyof Errors] = (messages as string[])[0]; 
        }
      }

      setErrors(serverErrors);
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPhoto(event.target.files[0]);
    }
  };

  return (
    <div id='regist' className='mt-[140px] container mx-auto px-4 leading-10'>
      <h2 className='text-[40px] font-normal text-center'>Working with POST request</h2>
      <div className='md:flex md:items-center md:justify-center'>
        <form className='flex flex-col mt-[50px] md:flex' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <input
              id='name'
              type="text"
              name="name"
              required
              placeholder='Your name'
              value={name}
              className={`md:w-[380px] pl-4 border ${errors.name ? 'border-red-500' : 'border-gray-border'} rounded-md bg-gray-bg py-[7px]`}
              onChange={(e) => setName(e.target.value)}
              style={{ paddingLeft: '16px' }}
            />
            {errors.name && <p className='text-red-500'>{errors.name}</p>}
          </div>
          <div className='flex flex-col mt-[50px]'>
            <input
              type="email"
              name="email"
              required
              placeholder='Email'
              value={email}
              className={`md:w-[380px] pl-4 border ${errors.email ? 'border-red-500' : 'border-gray-border'} rounded-md bg-gray-bg py-[7px]`}
              onChange={(e) => setEmail(e.target.value)}
              style={{ paddingLeft: '16px' }}
            />
            {errors.email && <p className='text-red-500'>{errors.email}</p>}
          </div>
          <div className='flex flex-col mt-[50px]'>
            <InputMask
              mask="+389999999999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            >
              {(inputProps: any) => (
                <input
                  {...inputProps}
                  type="tel"
                  id='tel'
                  name="phone"
                  required
                  placeholder='Phone'
                  className={`md:w-[380px] pl-4 border ${errors.phone ? 'border-red-500' : 'border-gray-border'} rounded-md bg-gray-bg py-[7px]`}
                  style={{ paddingLeft: '16px' }}
                />
              )}
            </InputMask>
            {errors.phone && <p className='text-red-500'>{errors.phone}</p>}
            <label htmlFor='tel' className='text-[12px] text-gray-border ml-3 -mt-1'>+38 (XXX) XXX - XX - XX</label>
          </div>
          <div>
            <label className='text-[16px] leading-7 mt-6'>Select your position</label>
            {positions.map(position => (
              <div key={position.id} className='-mt-2'>
                <input
                  type="radio"
                  id={`position-${position.id}`}
                  name="position"
                  value={position.id}
                  required
                  className='leading-7 l-2'
                  onChange={() => setPosition(position.id)}
                />
                <label htmlFor={`position-${position.id}`} className='ml-3'>{position.name}</label>
              </div>
            ))}
          </div>
          <div className='mt-4'>
            <div className="relative mt-2">
              <input
                type="file"
                name="photo"
                id="photo"
                required
                onChange={handlePhotoChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className={`flex items-center space-x-4 mb-12 border ${errors.photo ? 'border-red-500' : 'border-gray-border'}`}>
                <button type="button" className="py-2 px-4 border border-gray-border text-gray-border rounded-md">Upload</button>
                <span className="w-full text-gray-500 py-[7px]">{photo ? photo.name : 'Upload your photo'}</span>
              </div>
              {errors.photo && <p className='text-red-500'>{errors.photo}</p>}
            </div>
          </div>
          <div className='text-center mt-4'>
            <button
              type='submit'
              className="px-[22px] bg-gray-bottom rounded-2xl mb-24 text-white hover:bg-gray-700 active:bg-gray-800"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
