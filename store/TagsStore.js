import { action, makeAutoObservable, observable, runInAction } from "mobx";
import axiosConfig from "./AxiosConfig";

class TagsStore {
  tags = [];
  loadingtags = true;
  constructor() {
    makeAutoObservable(this, {
      tags: observable,
      loadingtags: observable,
      getTags: action,
    });
  }

  async getTags() {
    axiosConfig
      .get("/tags/list")
      .then((response) => {
        runInAction(() => {
          const arr = response.data.sort((a, b) => a.Rank - b.Rank);
          this.loadingtags = true;
          this.tags = arr;
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.loadingtags = true;
          this.tags = [];
        });
        console.log("tags errors",err);
      })
      .finally(() => {
        runInAction(() => {
          this.loadingtags = false;
        });
      });
  }
}
export const tagsStore = new TagsStore();


