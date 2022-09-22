import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ReactElement } from "react";
import Layout from "../../components/layout/layout";
import WithCodeTags from "../../components/with-code-tag";
import { sanity } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { Project } from "../../types/project";
import { Slug } from "../../types/slug";

const Work = ({ project }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const imageProps = useNextSanityImage(sanity, project.image);

  return (
    <>
      <Head>
        <title>{`Kierian - ${project.name}`}</title>
      </Head>
      <div className="flex h-full flex-col items-center px-8 pt-16 pb-32">
        <WithCodeTags tag="h1" className="mt-12">
          <h1 className="my-4 text-3xl font-semibold">{project.name}</h1>
        </WithCodeTags>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="relative h-48 sm:h-[300px] md:h-[400px]">
            <Image
              blurDataURL={imageProps.blurDataURL}
              src={imageProps.src}
              loader={imageProps.loader}
              alt={project.name}
              className="object-cover"
              layout="fill"
            />
          </div>
          <WithCodeTags tag="article" className="mt-16">
            <PortableText
              value={project.description}
              components={{
                block: {
                  normal: ({ children }) =>
                    (children as string[])?.[0] ? (
                      <p className="text-sm font-light md:text-base">
                        {children}
                      </p>
                    ) : (
                      <p className="whitespace-pre text-sm before:content-['\a'] md:text-base">
                        {children}
                      </p>
                    ),
                },
                list: {
                  number: ({ children }) => (
                    <ol className="ml-10 list-decimal text-sm font-light md:text-base">
                      {children}
                    </ol>
                  ),
                },
              }}
            />
          </WithCodeTags>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanity.fetch(
    `*[_type == "project" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ project: Project }> = async ({
  params,
}) => {
  const project = await sanity.fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
    {
      slug: params?.slug || "",
    }
  );

  return {
    props: {
      project,
    },
  };
};

export default Work;

Work.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};