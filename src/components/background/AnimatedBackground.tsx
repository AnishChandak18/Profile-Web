import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
   type ISourceOptions,
   MoveDirection,
   OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const AnimatedBackground = ({ isDarkMode }: { isDarkMode: boolean }) => {
   const [init, setInit] = useState(false);

   useEffect(() => {
      initParticlesEngine(async (engine) => {
         await loadSlim(engine);
      }).then(() => {
         setInit(true);
      });
   }, [isDarkMode]);

   const options: ISourceOptions = useMemo(
      () => ({
         background: {
            color: {
               value: isDarkMode ? "#25314d" : "#ffffff",
            },
         },
         fpsLimit: 120,
         interactivity: {
            events: {
               onClick: {
                  enable: true,
                  mode: "push",
               },
               onHover: {
                  enable: true,
                  mode: "repulse",
               },
            },
            modes: {
               push: {
                  quantity: 2,
               },
               repulse: {
                  distance: 200,
                  duration: 0.4,
               },
            },
         },
         particles: {
            color: {
               value: isDarkMode ? "#ffffff" : "#25314d",
            },
            links: {
               color: isDarkMode ? "#ffffff" : "#25314d",
               distance: 150,
               enable: true,
               opacity: 0.5,
               width: 1,
            },
            move: {
               direction: MoveDirection.none,
               enable: true,
               outModes: {
                  default: OutMode.out,
               },
               random: true,
               speed: 4,
               straight: false,
            },
            number: {
               density: {
                  enable: true,
               },
               value: 130,
            },
            opacity: {
               value: 0.5,
            },
            shape: {
               type: "circle",
            },
            size: {
               value: { min: 1, max: 5 },
            },
         },
         detectRetina: true,
      }),
      [isDarkMode],
   );

   if (init) {
      return (
         <Particles
            id="tsparticles"
            options={options}
         />
      );
   }

   return <></>;
};

export default AnimatedBackground;