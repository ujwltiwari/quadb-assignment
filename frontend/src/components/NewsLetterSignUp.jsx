const NewsletterSignup = ({ className = "mt-8" }) => {
  return (
    <section
      className={`flex relative flex-col justify-center items-center px-20 py-24 w-full min-h-[360px] max-md:px-5 max-md:pt-24 max-md:max-w-full ${className ?? ""}`}
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/14410724ed31eeed135c69a2798454587068c9cd255adfca65de92ecf6a22f7e?placeholderIfAbsent=true&apiKey=69881ca4efe24956bf287a23a24c936c"
        alt=""
        className="object-cover absolute inset-0 size-full"
      />
      <div className="flex relative flex-col justify-center items-center max-w-full w-[540px]">
        <header className="flex flex-col items-center w-full text-center text-neutral-900">
          <h2 className="text-4xl font-medium tracking-tight leading-none max-md:max-w-full">
            Join Our Newsletter
          </h2>
          <p className="mt-2 text-lg leading-loose max-md:max-w-full">
            Sign up for deals, new products and promotions
          </p>
        </header>

        <form className="flex flex-col justify-center mt-8 max-w-full text-base font-medium tracking-tight leading-7 min-h-[52px] text-zinc-500 w-[488px]">
          <div className="flex flex-wrap gap-2 items-center w-full border-b border-solid border-b-zinc-500 border-b-opacity-50 min-h-[52px] max-md:max-w-full">
            <div className="flex flex-1 shrink gap-2 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ace30c34d97c1fcc0d6797d54ceba142fb6cd554f85be757f416902e28005111?placeholderIfAbsent=true&apiKey=69881ca4efe24956bf287a23a24c936c"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
              <label htmlFor="emailInput" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="emailInput"
                placeholder="Email address"
                className="flex-1 shrink self-stretch my-auto basis-0 bg-transparent border-none"
                aria-label="Email address"
              />
            </div>
            <button
              type="submit"
              className="flex gap-0.5 items-center self-stretch my-auto whitespace-nowrap border-0 border-solid border-neutral-900 bg-transparent"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
