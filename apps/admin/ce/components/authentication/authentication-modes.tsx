import { observer } from "mobx-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { KeyRound, Mails } from "lucide-react";
// types
import {
  TGetBaseAuthenticationModeProps,
  TInstanceAuthenticationMethodKeys,
  TInstanceAuthenticationModes,
} from "@plane/types";
import { resolveGeneralTheme } from "@plane/utils";
// components
import { AuthenticationMethodCard } from "@/components/authentication/authentication-method-card";
import { EmailCodesConfiguration } from "@/components/authentication/email-config-switch";
import { GithubConfiguration } from "@/components/authentication/github-config";
import { GitlabConfiguration } from "@/components/authentication/gitlab-config";
import { GoogleConfiguration } from "@/components/authentication/google-config";
import { PasswordLoginConfiguration } from "@/components/authentication/password-config-switch";
// plane admin components
import { UpgradeButton } from "@/plane-admin/components/common";
// assets
import githubLightModeImage from "@/public/logos/github-black.png";
import githubDarkModeImage from "@/public/logos/github-white.png";
import GitlabLogo from "@/public/logos/gitlab-logo.svg";
import GoogleLogo from "@/public/logos/google-logo.svg";
import OIDCLogo from "@/public/logos/oidc-logo.svg";
import SAMLLogo from "@/public/logos/saml-logo.svg";

export type TAuthenticationModeProps = {
  disabled: boolean;
  updateConfig: (key: TInstanceAuthenticationMethodKeys, value: string) => void;
};

// Authentication methods
export const getAuthenticationModes: (props: TGetBaseAuthenticationModeProps) => TInstanceAuthenticationModes[] = ({
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
    icon: <Image src={GoogleLogo} height={20} width={20} alt="Google Logo" />,
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
        alt="GitHub Logo"
      />
    ),
    config: <GithubConfiguration disabled={disabled} updateConfig={updateConfig} />,
  },
  {
    key: "gitlab",
    name: "GitLab",
    description: "Permitir que membros entrem ou se cadastrem no NWERP com suas contas GitLab.",
    icon: <Image src={GitlabLogo} height={20} width={20} alt="GitLab Logo" />,
    config: <GitlabConfiguration disabled={disabled} updateConfig={updateConfig} />,
  },
  {
    key: "oidc",
    name: "OIDC",
    description: "Autentique seus usuários via o protocolo OpenID Connect.",
    icon: <Image src={OIDCLogo} height={22} width={22} alt="OIDC Logo" />,
    config: <UpgradeButton />,
    unavailable: true,
  },
  {
    key: "saml",
    name: "SAML",
    description: "Autentique seus usuários via o protocolo Security Assertion Markup Language.",
    icon: <Image src={SAMLLogo} height={22} width={22} alt="SAML Logo" className="pl-0.5" />,
    config: <UpgradeButton />,
    unavailable: true,
  },
];

export const AuthenticationModes: React.FC<TAuthenticationModeProps> = observer((props) => {
  const { disabled, updateConfig } = props;
  // next-themes
  const { resolvedTheme } = useTheme();

  return (
    <>
      {getAuthenticationModes({ disabled, updateConfig, resolvedTheme }).map((method) => (
        <AuthenticationMethodCard
          key={method.key}
          name={method.name}
          description={method.description}
          icon={method.icon}
          config={method.config}
          disabled={disabled}
          unavailable={method.unavailable}
        />
      ))}
    </>
  );
});
