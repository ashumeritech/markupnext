export interface IPreferenceState {
    title: string;
    subTitle: string;
    getTitle: string;
    getSubTitle: string;
    updateTitle: (title: string) => void;
    updateSubTitle: (subTitle: string) => void;
}