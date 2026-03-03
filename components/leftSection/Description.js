const DESCRIPTION_HOME =
  "I'm Ruhul Amin, a passionate Software Developer with expertise in HTML, CSS, JavaScript, and modern frameworks like React and Next.js. I actively leverage AI-powered tools like Trae, ChatGPT(Codex), and Claude to write cleaner code faster and debug efficiently. I love creating user-friendly and responsive websites, combining clean design with powerful functionality. With a keen eye for UI/UX and a commitment to seamless performance, let's build something great together!";

const DESCRIPTION_SIDEBAR =
  "I am a passionate web developer skilled in JavaScript, React, and Next.js. I love crafting responsive, user-friendly interfaces with clean design and strong functionality.";

function Description({ mobile }) {
  return (
    <>
      {mobile ? (
        <p className="text-gray-400  text-[18px] ">{DESCRIPTION_SIDEBAR}</p>
      ) : (
        <p className="text-gray-400 w-full  text-xl leading-relaxed pt-6 my-4">
          {DESCRIPTION_HOME}
        </p>
      )}
    </>
  );
}

export default Description;
