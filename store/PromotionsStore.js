import { action, makeAutoObservable, observable, runInAction } from "mobx";
import axiosConfig from "./AxiosConfig";

class PromotionsStore {
  promotions = [];
  promotion = null;
  loadingpromotions = true;
  loadingpromotion = true;
  constructor() {
    makeAutoObservable(this, {
      promotions: observable,
      promotion: observable,
      loadingpromotions: observable,
      loadingpromotion: observable,
      getPromotions: action,
      getPromotionById: action,
    });
  }
  async getPromotions() {
    axiosConfig
      .get("/promotions/list?Channel=PWA")
      .then((response) => {
        runInAction(() => {
          this.loadingpromotions.true;
          this.promotions = response.data;
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.loadingpromotions = true;
          this.promotions = [];
        });
        console.log("promotions error", err);
      })
      .finally(() => {
        runInAction(() => {
          this.loadingpromotions = false;
        });
      });
  }
  async getPromotionById(Id) {
    axiosConfig
    .get(`/promotions?Id=${Id}`)
    .then((response) => {
      runInAction(() => {
        this.loadingpromotion.true;
        this.promotion = response.data;
      });
    })
    .catch((err) => {
      runInAction(() => {
        this.loadingpromotion = true;
        this.promotion = null;
      });
      console.log("promotions error", err);
    })
    .finally(() => {
      runInAction(() => {
        this.loadingpromotion = false;
      });
    });
  }
}

export const promotionsStore = new PromotionsStore();
