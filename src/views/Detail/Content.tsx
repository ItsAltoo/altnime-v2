import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { ContentProps } from "@/types";
import React from "react";

const Content: React.FC<ContentProps> = ({
  synopsis,
  background,
  info,
  trailer,
}) => {
  return (
    <>
      <section className="mt-4">
        <h1 className="text-lg font-semibold underline-offset-2 underline mb-3">
          Synopsis
        </h1>
        <p className="overflow-y-scroll max-h-52 md:max-h-28 md:overflow-auto ">
          {synopsis || "-"}
        </p>
        <h1 className="text-lg font-semibold underline-offset-2 underline mb-3 mt-6">
          Background
        </h1>
        <p className="overflow-y-scroll max-h-52 md:max-h-28 md:overflow-auto ">
          {background || "-"}
        </p>

        {info.about && (
          <>
            <h1 className="text-lg font-semibold underline-offset-2 underline mb-3 mt-6">
              About
            </h1>
            <p className="overflow-y-scroll max-h-52 md:max-h-28 md:overflow-auto ">
              {info.about || "-"}
            </p>
          </>
        )}

        {/* Additional Info Section */}
        <div>
          <h1 className="text-lg font-semibold underline-offset-2 underline mb-3 mt-6">
            Additional Info
          </h1>
          <ul className="list-none ">
            {info.studios && (
              <li>
                <strong>Studios:</strong> {info.studios.join(", ")}
              </li>
            )}
            {info.producers && (
              <li>
                <strong>Producers:</strong> {info.producers.join(", ")}
              </li>
            )}
            {info.season && (
              <li>
                <strong>Season:</strong> {info.season}
              </li>
            )}
            {info.duration && (
              <li>
                <strong>Duration:</strong> {info.duration}
              </li>
            )}
            {info.source && (
              <li>
                <strong>Source:</strong> {info.source}
              </li>
            )}
            {info.titles && (
              <>
                <h1>
                  <strong>Titles:</strong>
                </h1>
                {info.titles.map((title, index) => (
                  <li key={index} className="indent-3">
                    {title}
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>

        {trailer.url && (
          <HeroVideoDialog
            className="mt-5 flex items-center justify-center"
            animationStyle="from-center"
            videoSrc={trailer.url}
            thumbnailSrc={trailer.images.image_url}
          />
        )}
      </section>
    </>
  );
};

export default Content;
