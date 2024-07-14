import React, { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@mui/material";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import SearchIcon from "@mui/icons-material/Search";
import StorageIcon from "@mui/icons-material/Storage";

const iconSize = 60;

type CustomLinkProps = {
  href: string;
  children: ReactNode;
};

const CustomLink = ({ href, children }: CustomLinkProps) => (
  <Link href={href} passHref>
    <div className="mt-4 transition-transform duration-200 transform hover:scale-105">
      {children}
    </div>
  </Link>
);

export default function NavigationButtons() {
  return (
    <div className="flex flex-col items-center justify-center">
      <CustomLink href="/swiper">
        <Icon
          component={ViewCarouselIcon}
          sx={{ height: iconSize, width: iconSize }}
        />
      </CustomLink>
      <CustomLink href="/search">
        <Icon
          component={SearchIcon}
          sx={{ height: iconSize, width: iconSize }}
        />
      </CustomLink>
      <CustomLink href="/dex">
        <Icon
          component={StorageIcon}
          sx={{ height: iconSize, width: iconSize }}
        />
      </CustomLink>
    </div>
  );
}
