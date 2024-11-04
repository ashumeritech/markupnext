import { ICategory } from "../core/models/response/ICategoryResponse";

export interface ITreeView extends ICategory {
    children: Array<ITreeView> | null;
}