import React, { useState, useEffect, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  MenuItem,
  TextField,
  Button,
  Card,
  ListItem,
  ListItemText,
} from "@mui/material";

const allMembersList = [
  { name: "Alice Smith", age: 25, gender: "Female", level: 1 },
  { name: "Bob Johnson", age: 30, gender: "Male", level: 2 },
  { name: "Charlie Brown", age: 22, gender: "Male", level: 3 },
  // Add more members as needed
];

const allSignedInListDisplay = [
  { name: "Dave Wilson", age: 27, gender: "Male", level: 2 },
  { name: "Eve Davis", age: 24, gender: "Female", level: 1 },
  { name: "Fay Wong", age: 29, gender: "Female", level: 3 },
  // Add more signed-in members as needed
];

const MembersPage: React.FC = () => {
  const [tapPosition, setTapPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [foundMembers, setFoundMembers] = useState<any[]>([]);
  const [foundSignedIn, setFoundSignedIn] = useState<any[]>([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initialize with all members and signed in players
    setFoundMembers(allMembersList);
    setFoundSignedIn(allSignedInListDisplay);
  }, []);

  const handleTapPosition = (event: MouseEvent) => {
    setTapPosition({ x: event.clientX, y: event.clientY });
  };

  const handleContextMenu = (
    event: MouseEvent,
    player: any,
    signedIn: boolean
  ) => {
    event.preventDefault();
    setTapPosition({ x: event.clientX, y: event.clientY });
    setSelectedPlayer(player);
    setSignedIn(signedIn);
    setMenuAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuClick = (action: string) => {
    handleMenuClose();
    switch (action) {
      case "edit":
        router.push(`/add-new-players?player=${selectedPlayer}&edit=true`);
        break;
      case "sign in":
        signInPlayer(selectedPlayer);
        setFoundSignedIn(allSignedInListDisplay);
        break;
      case "sign out":
        removePlayer("sign out", selectedPlayer);
        setFoundSignedIn(allSignedInListDisplay);
        break;
      case "delete":
        removePlayer("remove", selectedPlayer);
        setFoundMembers(allMembersList);
        setFoundSignedIn(allSignedInListDisplay);
        break;
      default:
        break;
    }
  };

  const runFilter = (enteredText: string, signedIn: boolean = false) => {
    const results = enteredText
      ? (signedIn ? allSignedInListDisplay : allMembersList).filter((player) =>
          player.name.toLowerCase().includes(enteredText.toLowerCase())
        )
      : signedIn
        ? allSignedInListDisplay
        : allMembersList;

    signedIn ? setFoundSignedIn(results) : setFoundMembers(results);
  };

  function signAllOut() {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Members Page</h1>
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={{ top: tapPosition.y, left: tapPosition.x }}
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuClick("edit")}>Edit Player</MenuItem>
        <MenuItem
          onClick={() => handleMenuClick(signedIn ? "sign out" : "sign in")}
        >
          {signedIn ? "Sign Out" : "Sign In"}
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick("delete")}>
          Delete Player
        </MenuItem>
      </Menu>
      <div className="flex flex-grow space-x-4">
        <div className="flex flex-col w-1/2 space-y-4">
          <TextField
            onChange={(e) => runFilter(e.target.value, false)}
            label="Search Members"
            variant="outlined"
            className="mb-4"
          />
          <div className="flex-grow overflow-auto">
            {foundMembers.map((member, index) => (
              <Card
                key={index}
                onContextMenu={(e) => handleContextMenu(e, member, false)}
                className="mb-4 p-4 bg-orange-100"
              >
                <ListItem>
                  <ListItemText
                    primary={`${member.level} - ${member.name}`}
                    secondary={`${member.age} years old | ${member.gender}`}
                  />
                </ListItem>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-1/2 space-y-4">
          <TextField
            onChange={(e) => runFilter(e.target.value, true)}
            label="Search Signed In"
            variant="outlined"
            className="mb-4"
          />
          <div className="flex-grow overflow-auto">
            {foundSignedIn.map((member, index) => (
              <Card
                key={index}
                onContextMenu={(e) => handleContextMenu(e, member, true)}
                className="mb-4 p-4 bg-green-100"
              >
                <ListItem>
                  <ListItemText
                    primary={`${member.level} - ${member.name}`}
                    secondary={`${member.age} years old | ${member.gender}`}
                  />
                </ListItem>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/add-new-players")}
        >
          Add New Player
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.push("/courts")}
        >
          Current Matches
        </Button>
        <Button variant="contained" onClick={() => signAllOut()}>
          Sign All Out
        </Button>
      </div>
    </div>
  );
};

export default MembersPage;
function signInPlayer(selectedPlayer: any) {
  throw new Error("Function not implemented.");
}

function removePlayer(arg0: string, selectedPlayer: any) {
  throw new Error("Function not implemented.");
}
