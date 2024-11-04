export interface IIcon {
  icon: string;
  handler: (item?: object & { Id: number }) => void;
  title: string;
  isHeaderIconDisabled?: boolean;
  routeTo?: (item?: object) => string;
}
