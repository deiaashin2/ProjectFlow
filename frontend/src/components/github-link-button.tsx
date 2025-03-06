import IconTooltip from "./icon-tooltip";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useTheme } from "./theme-provider";
import githubLogoLight from "@/assets/github-mark-white.png";
import githubLogoDark from "@/assets/github-mark.png";

function GithubLinkButton() {
  const { theme } = useTheme();
  return (
    <IconTooltip label="Visit Project on Github">
      <Button size="icon" variant="ghost">
        <a href="https://github.com/deiaashin2/ProjectFlow" target="_blank">
          <Avatar className="flex items-center justify-center">
            <AvatarImage
              src={theme === "dark" ? githubLogoLight : githubLogoDark}
              className="size-6"
              alt="Logo of GitHub"
            />
          </Avatar>
        </a>
      </Button>
    </IconTooltip>
  );
}

export default GithubLinkButton;
