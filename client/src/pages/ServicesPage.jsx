import ServiceForm from "../components/ServiceForm";

const ServicesPage = ({activePlace,activeService}) => {
  return (
    <div className="services-page">
      <main>
        <ServiceForm activePlace={activePlace}/>
      </main>
    </div>
  );
};

export default ServicesPage;
