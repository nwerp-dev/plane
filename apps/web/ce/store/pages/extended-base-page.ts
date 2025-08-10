import { TPage, TPageExtended, EPageSharedUserAccess } from "@plane/types";
import { RootStore } from "@/plane-web/store/root.store";
import { TBasePageServices } from "@/store/pages/base-page";

export type TExtendedPageInstance = TPageExtended & {
  asJSONExtended: TPageExtended;
};

export class ExtendedBasePage implements TExtendedPageInstance {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(store: RootStore, page: TPage, services: TBasePageServices) {}

  // Implement required TPageExtended properties
  shared_access: EPageSharedUserAccess | null = null;
  is_shared: boolean = false;
  collaborators: Array<{ name: string; color: string; id?: string; photoUrl?: string; clientId?: number }> = [];
  sub_pages_count: number | undefined = undefined;
  team: string | null | undefined = undefined;
  parent_id: string | null | undefined = undefined;
  anchor?: string | null | undefined = undefined;
  sharedUsers: Array<{ user_id: string; access: EPageSharedUserAccess }> = [];

  get asJSONExtended(): TExtendedPageInstance["asJSONExtended"] {
    return {
      shared_access: this.shared_access,
      is_shared: this.is_shared,
      collaborators: this.collaborators,
      sub_pages_count: this.sub_pages_count,
      team: this.team,
      parent_id: this.parent_id,
      anchor: this.anchor,
      sharedUsers: this.sharedUsers,
    };
  }
}