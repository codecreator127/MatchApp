import Information from "@/components/Information";
import Results from "@/components/Results";
import Search from "@/components/Search";

// below are possible ways to add the coloured overlay using css (which would make it easy to change themes)
// currently the green background is part odf the image because text appears behind the coloured overlay otherwise.
// , boxShadow: "inset 0 0 0 1000px rgba(0,55,0,.2)"
// <div className="fixed top-0 left-0 w-48 h-full z-0 bg-base-100 z-0 opacity-80"></div>

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen">
        <div className="h-full w-2/5 mx-auto flex justify-center items-center">
          <Results />
        </div>
    </div>
    </>
  );
}
