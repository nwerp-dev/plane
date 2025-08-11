"use client";
import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ClipboardList } from "lucide-react";
// plane imports
import { Button } from "@plane/ui";
// hooks
import { useProject, useUserPermissions } from "@/hooks/store";
// assets
import Unauthorized from "@/public/auth/unauthorized.svg";

type Props = {
  projectId?: string;
  isPrivateProject?: boolean;
};

export const JoinProject: React.FC<Props> = (props) => {
  const { projectId, isPrivateProject = false } = props;
  // states
  const [isJoiningProject, setIsJoiningProject] = useState(false);
  // store hooks
  const { joinProject } = useUserPermissions();
  const { fetchProjectDetails } = useProject();

  const { workspaceSlug } = useParams();

  const handleJoin = () => {
    if (!workspaceSlug || !projectId) return;

    setIsJoiningProject(true);

    joinProject(workspaceSlug.toString(), projectId.toString())
      .then(() => fetchProjectDetails(workspaceSlug.toString(), projectId.toString()))
      .finally(() => setIsJoiningProject(false));
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-5 bg-custom-background-100 text-center">
      <div className="h-44 w-72">
        <Image src={Unauthorized} height="176" width="288" alt="JoinProject" />
      </div>
      <h1 className="text-xl font-medium text-custom-text-100">
        {!isPrivateProject ? `Você não é membro deste projeto ainda.` : `Você não é membro deste projeto.`}
      </h1>

      <div className="w-full max-w-md text-base text-custom-text-200">
        <p className="mx-auto w-full text-sm md:w-3/4">
          {!isPrivateProject
            ? `Clique no botão abaixo para entrar.`
            : `Este é um projeto privado. \n Não podemos te contar mais sobre este projeto para proteger a confidencialidade.`}
        </p>
      </div>
      {!isPrivateProject && (
        <div>
          <Button
            variant="primary"
            prependIcon={<ClipboardList color="white" />}
            loading={isJoiningProject}
            onClick={handleJoin}
          >
            {isJoiningProject ? "Entrando..." : "Clique para entrar"}
          </Button>
        </div>
      )}
    </div>
  );
};
