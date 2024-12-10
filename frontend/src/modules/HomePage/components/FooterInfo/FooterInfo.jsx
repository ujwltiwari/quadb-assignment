import { createElement } from "react";

const FooterInfo = ({ Icon, title, description }) => {
  console.log(Icon);
  return (
    <section className="flex flex-col px-8 py-12 bg-gray-100 w-full">
      {createElement(Icon, { className: "w-12 h-12 object-contain" })}
      <div className="flex flex-col mt-4 w-full items-start">
        <h2 className="text-xl font-medium leading-snug text-neutral-900">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>
      </div>
    </section>
  );
};

export default FooterInfo;
