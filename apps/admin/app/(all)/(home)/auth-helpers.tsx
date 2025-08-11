import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { KeyRound, Mails } from "lucide-react";
// plane packages
import { SUPPORT_EMAIL, EAdminAuthErrorCodes, TAdminAuthErrorInfo } from "@plane/constants";
import { TGetBaseAuthenticationModeProps, TInstanceAuthenticationModes } from "@plane/types";
import { resolveGeneralTheme } from "@plane/utils";
// components
import { EmailCodesConfiguration } from "@/components/authentication/email-config-switch";
import { GithubConfiguration } from "@/components/authentication/github-config";
import { GitlabConfiguration } from "@/components/authentication/gitlab-config";
import { GoogleConfiguration } from "@/components/authentication/google-config";
import { PasswordLoginConfiguration } from "@/components/authentication/password-config-switch";
// images
import githubLightModeImage from "@/public/logos/github-black.png";
import githubDarkModeImage from "@/public/logos/github-white.png";
import GitlabLogo from "@/public/logos/gitlab-logo.svg";
import GoogleLogo from "@/public/logos/google-logo.svg";

export enum EErrorAlertType {
  BANNER_ALERT = "BANNER_ALERT",
  INLINE_FIRST_NAME = "INLINE_FIRST_NAME",
  INLINE_EMAIL = "INLINE_EMAIL",
  INLINE_PASSWORD = "INLINE_PASSWORD",
  INLINE_EMAIL_CODE = "INLINE_EMAIL_CODE",
}

const errorCodeMessages: {
  [key in EAdminAuthErrorCodes]: { title: string; message: (email?: string | undefined) => ReactNode };
} = {
  // admin
  [EAdminAuthErrorCodes.ADMIN_ALREADY_EXIST]: {
    title: `Administrador já existe`,
    message: () => `O administrador já existe. Tente novamente.`,
  },
  [EAdminAuthErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD_FIRST_NAME]: {
    title: `E-mail, senha e nome são obrigatórios`,
    message: () => `E-mail, senha e nome são obrigatórios. Tente novamente.`,
  },
  [EAdminAuthErrorCodes.INVALID_ADMIN_EMAIL]: {
    title: `E-mail do administrador inválido`,
    message: () => `E-mail do administrador inválido. Tente novamente.`,
  },
  [EAdminAuthErrorCodes.INVALID_ADMIN_PASSWORD]: {
    title: `Senha do administrador inválida`,
    message: () => `Senha do administrador inválida. Tente novamente.`,
  },
  [EAdminAuthErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD]: {
    title: `E-mail e senha obrigatórios`,
    message: () => `E-mail e senha obrigatórios. Tente novamente.`,
  },
  [EAdminAuthErrorCodes.ADMIN_AUTHENTICATION_FAILED]: {
    title: `Falha na autenticação`,
    message: () => `Falha na autenticação. Tente novamente.`,
  },
  [EAdminAuthErrorCodes.ADMIN_USER_ALREADY_EXIST]: {
    title: `Usuário administrador já existe`,
    message: () => (
      <div>
        Usuário administrador já existe.&nbsp;
        <Link className="underline underline-offset-4 font-medium hover:font-bold transition-all" href={`/admin`}>
          Entrar
        </Link>
        &nbsp;agora.
      </div>
    ),
  },
  [EAdminAuthErrorCodes.ADMIN_USER_DOES_NOT_EXIST]: {
    title: `Usuário administrador não existe`,
    message: () => (
      <div>
        Usuário administrador não existe.&nbsp;
        <Link className="underline underline-offset-4 font-medium hover:font-bold transition-all" href={`/admin`}>
          Entrar
        </Link>
        &nbsp;agora.
      </div>
    ),
  },
  [EAdminAuthErrorCodes.ADMIN_USER_DEACTIVATED]: {
    title: `Conta de usuário desativada`,
    message: () =>
      `Conta de usuário desativada. Entre em contato com ${!!SUPPORT_EMAIL ? SUPPORT_EMAIL : "o administrador"}.`,
  },
};

export const authErrorHandler = (
  errorCode: EAdminAuthErrorCodes,
  email?: string | undefined
): TAdminAuthErrorInfo | undefined => {
  const bannerAlertErrorCodes = [
    EAdminAuthErrorCodes.ADMIN_ALREADY_EXIST,
    EAdminAuthErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD_FIRST_NAME,
    EAdminAuthErrorCodes.INVALID_ADMIN_EMAIL,
    EAdminAuthErrorCodes.INVALID_ADMIN_PASSWORD,
    EAdminAuthErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD,
    EAdminAuthErrorCodes.ADMIN_AUTHENTICATION_FAILED,
    EAdminAuthErrorCodes.ADMIN_USER_ALREADY_EXIST,
    EAdminAuthErrorCodes.ADMIN_USER_DOES_NOT_EXIST,
    EAdminAuthErrorCodes.ADMIN_USER_DEACTIVATED,
  ];

  if (bannerAlertErrorCodes.includes(errorCode))
    return {
      type: EErrorAlertType.BANNER_ALERT,
      code: errorCode,
      title: errorCodeMessages[errorCode]?.title || "Erro",
      message: errorCodeMessages[errorCode]?.message(email) || "Algo deu errado. Tente novamente.",
    };

  return undefined;
};

export const getBaseAuthenticationModes: (props: TGetBaseAuthenticationModeProps) => TInstanceAuthenticationModes[] = ({
  disabled,
  updateConfig,
  resolvedTheme,
}) => [
  {
    key: "unique-codes",
    name: "Códigos únicos",
    description:
      "Entre ou cadastre-se no NWERP usando códigos enviados por e-mail. É necessário configurar o SMTP para usar este método.",
    icon: <Mails className="h-6 w-6 p-0.5 text-custom-text-300/80" />,
    config: <EmailCodesConfiguration disabled={disabled} updateConfig={updateConfig} />,
  },
  {
    key: "passwords-login",
    name: "Senhas",
    description: "Permitir que membros criem contas com senhas e usem junto ao e-mail para entrar.",
    icon: <KeyRound className="h-6 w-6 p-0.5 text-custom-text-300/80" />,
    config: <PasswordLoginConfiguration disabled={disabled} updateConfig={updateConfig} />,
  },
  {
    key: "google",
    name: "Google",
    description: "Permitir que membros entrem ou se cadastrem no NWERP com suas contas Google.",
    icon: <Image src={GoogleLogo} height={20} width={20} alt="Logo Google" />,
    config: <GoogleConfiguration disabled={disabled} updateConfig={updateConfig} />,
  },
  {
    key: "github",
    name: "GitHub",
    description: "Permitir que membros entrem ou se cadastrem no NWERP com suas contas GitHub.",
    icon: (
      <Image
        src={resolveGeneralTheme(resolvedTheme) === "dark" ? githubDarkModeImage : githubLightModeImage}
        height={20}
        width={20}
        alt="Logo GitHub"
      />
    ),
    config: <GithubConfiguration disabled={disabled} updateConfig={updateConfig} />,
  },
  {
    key: "gitlab",
    name: "GitLab",
    description: "Permitir que membros entrem ou se cadastrem no NWERP com suas contas GitLab.",
    icon: <Image src={GitlabLogo} height={20} width={20} alt="Logo GitLab" />,
    config: <GitlabConfiguration disabled={disabled} updateConfig={updateConfig} />,
  },
];
