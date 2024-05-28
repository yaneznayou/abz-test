export const Header: React.FC = () => {
    return (
      <header>
        <div className='flex justify-between items-center container mx-auto px-4 xl:max-w-[1400px] xl:px-0'>
          <img src='/img/Logo.svg' alt="Logo_testTask" />
          <div className="py-4">
            <a href="#users" className="font-nunito py-1 px-7 bg-yellow-300 rounded-2xl text-center">Users</a>
            <a href="#regist" className="py-1 px-6 ml-3 bg-yellow-300 rounded-2xl text-center">Sign up</a>
          </div>
        </div>
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center w-full xl:container xl:mx-auto xl:max-w-[1400px]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-white text-center pt-10 font-normal text-[40px] leading-10 max-w-[328px] md:max-w-[380px]">
                Test assignment for front-end developer
              </h1>
              <p className="text-white mt-[21px] text-base font-normal leading-7 max-w-[380px] text-center">
                What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
              </p>
            </div>
            <div className="text-center">
              <a href="#regist" className="inline-block py-1 px-6 mt-8 mb-[71px] bg-yellow-300 rounded-2xl">Sign up</a>
            </div>
          </div>
        </div>
      </header>
    );
  };
  