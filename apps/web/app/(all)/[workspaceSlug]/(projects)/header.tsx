"use client";

import { observer } from "mobx-react";
import { useTheme } from "next-themes";
import { Home, Shapes } from "lucide-react";
// images
// ui
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
        <Header.RightItem>
          <Button
            variant="neutral-primary"
            size="sm"
            onClick={() => toggleWidgetSettings(true)}
            className="my-auto mb-0"
          >
            <Shapes size={16} />
            <div className="hidden text-xs font-medium sm:hidden md:block">{t("home.manage_widgets")}</div>
          </Button>
        </Header.RightItem>
      </Header>
    </>
  );
});
