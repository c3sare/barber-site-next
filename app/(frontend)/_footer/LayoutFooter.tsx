import { getFooterComponents } from "@/actions/admin/footer/getFooterComponents";
import { RenderFooterComponent } from "@/components/builder/RenderFooterComponent";

const LayoutFooter: React.FC<React.PropsWithChildren> = async () => {
  const footerComponents = await getFooterComponents();

  return (
    <>
      <footer className="relative overflow-hidden text-[#AAA] block bg-[#0c0c0c] py-24">
        <div className="max-w-7xl mx-auto p-4">
          {footerComponents.map((component) => (
            <RenderFooterComponent key={component.id} {...component} />
          ))}
          <div className="clear-both" />
        </div>
      </footer>
      <div className="w-full bg-[rgb(36,36,36)] text-white py-8">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>2023 Barberia</p>
        </div>
      </div>
    </>
  );
};

export default LayoutFooter;
