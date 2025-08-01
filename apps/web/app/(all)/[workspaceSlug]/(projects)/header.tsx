"use client";

import { observer } from "mobx-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Home, Shapes } from "lucide-react";
// images
import githubBlackImage from "/public/logos/github-black.png";
import githubWhiteImage from "/public/logos/github-white.png";
// ui
import { GITHUB_REDIRECTED_TRACKER_EVENT, HEADER_GITHUB_ICON } from "@plane/constants";
import { useTranslation } from "@plane/i18n";
import { Breadcrumbs, Button, Header } from "@plane/ui";
// components
import { BreadcrumbLink } from "@/components/common";
// constants
// hooks
import { captureElementAndEvent } from "@/helpers/event-tracker.helper";
import { useHome } from "@/hooks/store/use-home";

export const WorkspaceDashboardHeader = observer(() => {
  // hooks
  const { resolvedTheme } = useTheme();
  const { toggleWidgetSettings } = useHome();
  const { t } = useTranslation();

  return (
    <>
      <Header>
        <Header.LeftItem>
          <div className="flex items-center gap-2">
            <Breadcrumbs>
              <Breadcrumbs.Item
                component={
                  <BreadcrumbLink label={t("home.title")} icon={<Home className="h-4 w-4 text-custom-text-300" />} />
                }
              />
            </Breadcrumbs>
          </div>
        </Header.LeftItem>
      </Header>
    </>
  );
});
