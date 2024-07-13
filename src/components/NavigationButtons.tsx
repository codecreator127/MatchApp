import { Icon } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StorageIcon from "@mui/icons-material/Storage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

export default function NavigationButtons() {
  const iconSize = 60;

  return (
    <div className="flex flex-col items-center justify-center">
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
      <a
        href="/profile"
        className="mt-4 transition-transform duration-200 transform hover:scale-105"
        rel="noopener noreferrer"
      >
        <Icon
          component={AccountCircleIcon}
          sx={{ height: iconSize, width: iconSize }}
        />
      </a>
      <a
        href="/settings"
        className="mt-4 transition-transform duration-200 transform hover:scale-105"
        rel="noopener noreferrer"
      >
        <Icon
          component={SettingsIcon}
          sx={{ height: iconSize, width: iconSize }}
        />
      </a>
    </div>
  );
}
