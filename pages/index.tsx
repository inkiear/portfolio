import Head from "next/head";
import { ReactElement } from "react";
import AnimatedK from "../components/animated-k";
import Layout from "../components/layout/layout";
import WithCodeTags from "../components/with-code-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Home = () => {
  return (
    <>
      <Head>
        <title>Kierian - Home</title>
      </Head>
      <div className="min-h-full px-12">
        <div className="h-screen">
          <div className="-mt-6 flex h-full flex-col items-center justify-center">
            <AnimatedK />
            <WithCodeTags tag="h1" className="mt-12">
              <h1
                className="intro-title text-3xl md:text-5xl"
                data-text="Hi, I'm Kierian, fullstack developer."
              >
                Hi, {`I'm`} Kierian, fullstack developer.
              </h1>
            </WithCodeTags>
            <WithCodeTags tag="p" className="">
              <p className="block max-w-md text-center font-mono text-[12px] text-muted duration-200 hover:text-black dark:text-dimmed dark:hover:text-white sm:text-sm">
                I specialize in creating, designing, developing and deploying
                software systems at scale.
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <a
                  href="https://github.com/kierien"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="text-2xl md:text-3xl"
                  />
                </a>
                <a
                  href="https://my.linkedin.com/in/kierian"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="text-2xl md:text-3xl"
                  />
                </a>
              </div>
            </WithCodeTags>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
