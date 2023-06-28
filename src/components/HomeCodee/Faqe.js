import { Accordion } from "react-bootstrap";
import { useState } from "react";
import Faq2 from "./Faq2";
import Footere from './Footere'
import img4 from "./img/4.jpg"
import Navbare from "./Navbaree";
import "./Faq.css"

function Faq() {
  const [faqs, setfaqs] = useState([

    {
      
      question : (<>What is the purpose of the Intheair platform?</>),
      answer: (<>By choosing Intheair Saas, you benefit from a state-of-the-art platform for storing, viewing and downloading
        and download your flight data. This is our key to providing you with an unparalleled customer experience
        experience, with carefully curated deliverables presented in an organized and aesthetically pleasing manner via a
        dashboard dedicated to your projects. Our synthetic reports with graphical visualization
        visualization provide you with a clear and concise view of the data collected, allowing you to make
        decisions in the blink of an eye.<br></br><br></br>
        In addition, you have the possibility to download, archive and consult your deliverables at any time, for
      for total flexibility.<br></br><br></br>
      Also customize your reports using our filters to meet your specific needs.
      With Intheair Saas, you have access to more than just a data visualization solution, we are your trusted partner to
      we are your trusted partner to maximize the value of your flight data and optimize your
      your decision making</>),
      
      open: true
    },
    {
      question: (<>What are your areas of intervention?</>),
      answer: (<>Thanks to our vast network of approved telepilots throughout France, we are able to
        to intervene efficiently on all your projects, wherever you are. Our telepilots are highly
        qualified and efficient. They have a wide range of sensors and state-of-the-art drones to meet all your needs.
        to meet all your needs. Whether you need topographic surveys, 3D modeling
        infrastructure inspections, or other services, our network of experienced telepilots is ready to take on
        to take up any challenge. We also operate in Spain and soon in Morocco.
        </>),
       open: false
    },
    {
      question: (<>The technologies you use?</>),
      answer: (<>We use a full range of state-of-the-art technologies to meet your specific needs.
        Our services are performed using the latest generation of drones, as well as remote sensing technologies such as
        technologies such as LIDAR and satellites. In addition, we have different types of
        sensors, such as RGB, Lidar, Thermographic, Multispectral, to meet the specific requirements
        specific requirements of each project. We also use advanced technologies such as RTK
        (Real-Time Kinematic), GPC (Geodetic Centimeter Positioning) and GNSS
        (Global Navigation Satellite System) receivers to ensure maximum accuracy and reliability in our
        in our services. Our technological approach is constantly updated to remain at the forefront of
        advances in the industry and to offer our customers innovative and efficient solutions for their
        their projects.</>),
      open: false
    },
    
    {
      question: (<>What types of deliverables do you provide?</>),
      answer: (<>In addition to the raw data, we provide you with deliverables that have been carefully processed by state-of-the-art
        CAD/CAM software, which allows us to provide you with highly accurate and usable results.
        and usable results. We can offer you a wide range of deliverables, such as detailed topographic plans
        detailed topographic plans, thermographic images for infrastructure analysis, realistic
        realistic 3D models and much more. Our commitment to quality and innovation
        complement these deliverables with accurate and aesthetic summary reports to provide you with a
        your data, make informed decisions and easily communicate with your stakeholders.
        communicate easily with your stakeholders.
      </>),
       open: false
    },
    {
      question: (<>What pricing options do you offer for your services?</>),
      answer: (<>Our rates are customized according to the type of project, its area of intervention, its complexity
        as well as the specific requirements of each mission. We understand that each case is unique and requires a tailored
        and requires a tailored approach to ensure the best quality of service. That is why we
        carefully assess each client's needs and establish rates accordingly, in order to provide a solution that
        to provide a solution that fits their expectations and budget.
        </>),
       open: false
    },
    {
      question: (<>What measures are taken to ensure the security of your customers' data?</>),
      answer: (<>Nous utilisons une infrastructure hybride et évoluée qui nous permet de garantir la disponibilité et la
        security of our customers' data, even in the event of outages or external threats.*<br></br><br></br>
        We implement redundancy, backup and disaster recovery measures to
        continuity of operations and protect data from unwanted interruption or loss.
        loss. Our proactive approach to security keeps us at the forefront of industry best practices
        industry best practices and ensure the confidentiality, integrity and availability of our customers' data at all times.<br></br><br></br>
        Beyond our infrastructure, our platform itself is designed with advanced security features to protect
        security features to protect our customers' data. We use encryption protocols
        protocols to secure data in transit and at rest, as well as strict access controls to restrict
        access to data only to authorized users.</>),
       open: false
    },
    {
      question: (<>How accurate is the data provided?</>),
      answer: (<>La précision des données fournies par Intheair répond aux besoins de tous nos clients en offrant une
        marge d'erreur de moins de 5 centimètres pour tous nos livrables. In some cases, we can even reach an accuracy
        even achieve an accuracy of up to 2 centimeters.<br></br><br></br>
        In addition, we are constantly adopting new practices and technologies to
        improve our accuracy on a continuous basis and thus guarantee high quality results to our
        quality results to our customers.
        </>),
       open: false
    },
    {
      question: (<>How can I order your services?</>),
      answer: (<>To use our services, you can easily go through our platform. You have the possibility to
        request a quote by filling out a dedicated form, or by contacting our sales team directly
        to discuss your specific needs and get a personalized quote.<br></br><br></br>
        Our sales team will be happy to assist you in the ordering process and to provide you with all the information
        and provide you with all the necessary information to benefit from our services.
        </>),
       open: false
    },
    {
      question: (<>What are the differences between RGB and Lidar capture?</>),
      answer: (<>RGB (Red, Green, Blue) capture is based on the capture of visible images from sensors that
      the light reflected from the earth's surface in the red, green and blue color bands.
      blue bands. It is generally used for projects that require a visualization in real color of the earth's surface which allows
      of the earth's surface which allows to distinguish objects and features of the landscape in a visual
      a visual way.<br></br><br></br>
      It can be adapted for projects such as environmental monitoring, precision agriculture, natural resource
      natural resource management, urban mapping and land use planning visualization.
      land use planning.<br></br><br></br>
      Lidar is a measurement technology that uses lasers to measure the distance between a sensor and the earth's surface.
      a sensor and the earth's surface. Lidar generates three-dimensional point clouds that contain
      precise information about the topography of the terrain, the height of objects, vegetation and other
      characteristics of the landscape. Lidar is capable of collecting data with a high degree of accuracy in terms of
      distance, which makes it particularly suitable for projects requiring precise three-dimensional
      accurate three-dimensional data such as 3D modeling, high resolution mapping, civil engineering
      civil engineering, forest resource management, natural hazard management and urban planning.
      urban planning.
      </>),
       open: false
    },
    {
      question: (<>What benefits could be derived from the use of a drone in the context of surveying and
        surveying, compared to the use of more traditional ground-based surveys:</>),
      answer: (<>The use of a drone offers several advantages:<br></br><br></br>
      - Speed: Drones can cover large areas to collect topographic data, unlike ground-based
      topographic data, unlike ground-based surveys.<br></br><br></br>
      We are able to quickly capture and process aerial data for your
      topography and mapping projects. This allows us to provide you with results quickly
      quickly, allowing you to save time in your projects.<br></br><br></br>
      - Reduced costs: The use of drones reduces the overall costs of surveying and topography.
      Therefore, we offer competitive and personalized rates depending on the type of project, the
      project type, survey area, project complexity and project requirements. We strive to
      We strive to offer excellent value for money for all our services.<br></br><br></br>
      - Accessibility of hard-to-reach areas: Drones can access hard-to-reach or dangerous areas
      or dangerous areas, allowing data to be collected in places where access may be limited with
      may be limited with traditional means.<br></br><br></br>
      - Increased safety: Drones reduce risk to operators by avoiding potential hazards in the field.
      potential hazards in the field.<br></br><br></br>
      - Flexibility and versatility: UAVs can be used for a wide variety of surveying
      of surveying applications.<br></br><br></br>
      Beyond the advantages of drone technology, Intheair also has a quality customer service
      Our team is available to answer your questions, help you in the ordering process and provide technical
      and provide technical support if needed.<br></br><br></br>
      Nous nous engageons à vous garantir un service de qualité et une expérience positive
      through our scalable data visualization platform that allows you to easily access
      easily access your data online, anytime and from anywhere.<br></br><br></br>
      You can view them, share them with your customers and collaborators, and make informed
      decisions based on the summary information and reports provided
        </>),
       open: false
    }

  ]);
  const toggleFAQ = index => {
    setfaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open
      } else {
        faq.open = false;
      }

      return faq;
    }))
  }

      return (
      <>
      <Navbare/>
    <div className="Faq">
      

      <p className="titre">Questions <span style={{ color: '#674CC0' }}>&</span> Answers.</p>
  
      <div className="faqs">
                
        {faqs.map((faq, i) => (
          <Faq2 faq={faq} index={i} toggleFAQ={toggleFAQ} />
        ))}
      </div>
      <Footere/>
    </div>
    </>
  );
}

export default Faq;