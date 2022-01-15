import { GitHubIcon } from "./Icon";

export default function Footer() {
  return (
    <div className="flex flex-row justify-between">
      <a
        href={"https://github.com/richwill28/pathfinding-visualizer"}
        className="hover:text-sky-500 transition ease-linear flex flex-row gap-1.5 items-center"
      >
        <GitHubIcon />
        <span className="font-mono font-bold">GitHub</span>
      </a>
      <a
        href={"https://www.youtube.com/channel/UCaO6VoaYJv4kS-TQO_M-N_g"}
        className="hover:text-sky-500 transition ease-linear flex flex-row"
      >
        <span className="align-middle text-sm font-mono font-bold">
          Inspired by Clément Mihailescu
        </span>
      </a>
    </div>
  );
}
