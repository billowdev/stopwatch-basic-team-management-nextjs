import { HISTORY_REPOSITORY } from "src/@core/constants";
import { History } from "./history.entity";

export const historyProviders = [
  {
    provide: HISTORY_REPOSITORY,
    useValue: History,
  },
];
