import { Icon } from "@mui/material";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import SearchIcon from "@mui/icons-material/Search";
import StorageIcon from "@mui/icons-material/Storage";

export default function NavigationButtons() {
  const iconSize = 60;

  return (
    <div className="flex flex-col items-center justify-center">
      <a
        href="/swiper"
        className="mt-4 transition-transform duration-200 transform hover:scale-105"
        rel="noopener noreferrer"
      >
        <Icon
          component={ViewCarouselIcon}
          sx={{ height: iconSize, width: iconSize }}
        />
      </a>
      <a
        href="/search"
        className="mt-4 transition-transform duration-200 transform hover:scale-105"
        rel="noopener noreferrer"
      >
        <Icon
          component={SearchIcon}
          sx={{ height: iconSize, width: iconSize }}
        />
      </a>
      <a
        href="/dex"
        className="mt-4 transition-transform duration-200 transform hover:scale-105"
        rel="noopener noreferrer"
      >
        <Icon
          component={StorageIcon}
          sx={{ height: iconSize, width: iconSize }}
        />
      </a>
    </div>
  );
}
