declare module "ysdk" {
  global {
    const YaGames: {
      init(opts?: {
        screen: {
          fullscreen?: boolean;
          orientation?: {
            value: "portrait" | "landscape";
            lock?: boolean;
          };
        };
      }): Promise<YandexGames.SDK>;
    };
  }

  namespace YandexGames {
    interface SDK {
      environment: {
        get app(): {
          id: string;
        };
        get browser(): {
          lang: string;
        };
        get i18n(): {
          lang: ISO_639_1;
          tld: TopLevelDomain;
        };
        get payload(): string | null;
      };

      deviceInfo: {
        get type(): string;
        isMobile(): boolean;
        isTablet(): boolean;
        isDesktop(): boolean;
        isTV(): boolean;
      };

      features: {
        LoadingAPI: {
          ready(): void;
        };
      };

      clipboard: {
        writeText(text: string): void;
      };

      screen: {
        fullscreen: {
          STATUS_ON: "on";
          STATUS_OFF: "off";
          status: string;
          request(): Promise<void>;
          exit(): Promise<void>;
        };
      };

      getStorage(): Promise<SafeStorage>;

      auth: {
        openAuthDialog(): Promise<void>;
      };

      getPlayer(): Promise<Player>;

      feedback: {
        canReview(): Promise<{
          value: boolean;
          reason?: FeedbackError;
        }>;
        requestReview(): Promise<{ feedbackSent: boolean }>;
      };

      adv: {
        showFullscreenAdv(opts?: {
          callbacks?: {
            onOpen?: () => void;
            onClose?: (wasShown: boolean) => void;
            onError?: (error: string) => void;
            onOffline?: () => void;
          };
        }): void;

        showRewardedVideo(opts?: {
          callbacks?: {
            onOpen?: () => void;
            onClose?: (wasShown: boolean) => void;
            onError?: (error: string) => void;
            onRewarded?: () => void;
          };
        }): void;

        showBannerAdv(): Promise<{ reason?: StickyAdvError }>;

        hideBannerAdv(): void;

        getBannerAdvStatus(): Promise<{
          stickyAdvIsShowing: boolean;
          reason?: StickyAdvError;
        }>;
      };

      EVENTS: {
        EXIT: ESdkEventName.EXIT;
        HISTORY_BACK: ESdkEventName.HISTORY_BACK;
      };

      dispatchEvent(eventName: ESdkEventName, detail?: any): Promise<unknown>;

      onEvent(eventName: ESdkEventName, listener: Function): () => void;

      shortcut: {
        canShowPrompt(): Promise<{ canShow: boolean }>;
        showPrompt(): Promise<{ outcome: "accepted" | "rejected" }>;
      };

      getPayments(opts?: { signed?: boolean }): Promise<Payments>;

      getLeaderboards(): Promise<Leaderboards>;
    }

    export type SafeStorage = typeof localStorage;

    export interface Player {
      getUniqueID(): string;
      getName(): string;
      getPhoto(size: "small" | "medium" | "large"): string;
      getIDsPerGame(): Promise<{ appID: number; userID: string }[]>;
      getMode(): "lite" | "";
      getData<TData>(keys?: (keyof TData)[]): Promise<Partial<TData>>;
      setData<TData>(data: Partial<TData>, flush?: boolean): Promise<void>;
      getStats<TStats>(keys?: (keyof TStats)[]): Promise<Partial<TStats>>;
      setStats<TStats extends Record<string, number>>(
        stats: Partial<TStats>
      ): Promise<void>;
      incrementStats<TStats extends Record<string, number>>(
        stats: Partial<TStats>
      ): Promise<Partial<TStats>>;
      signature: string;
    }

    export interface Purchase {
      productID: string;
      purchaseToken: string;
      developerPayload?: string;
      signature: string;
    }

    export interface Product {
      id: string;
      title: string;
      description: string;
      imageURI: string;
      /**
       * @description String in format: "\<price_value\> \<currency_code\>"
       */
      price: string;
      priceValue: string;
      priceCurrencyCode: string;
      getPriceCurrencyImage(size: ECurrencyImageSize): string;
    }

    export interface Payments {
      getPurchases(): Promise<Purchase[]>;
      getCatalog(): Promise<Product[]>;
      purchase(opts?: {
        id: string;
        developerPayload?: string;
      }): Promise<Purchase>;
      consumePurchase(token: string): Promise<void>;
    }

    export enum FeedbackError {
      NO_AUTH = "NO_AUTH",
      GAME_RATED = "GAME_RATED",
      REVIEW_ALREADY_REQUESTED = "REVIEW_ALREADY_REQUESTED",
      UNKNOWN = "UNKNOWN",
    }

    export enum StickyAdvError {
      ADV_IS_NOT_CONNECTED = "ADV_IS_NOT_CONNECTED",
      UNKNOWN = "UNKNOWN",
    }

    export enum ESdkEventName {
      EXIT = "EXIT",
      HISTORY_BACK = "HISTORY_BACK",
    }

    export enum ECurrencyImageSize {
      SMALL = "small",
      MEDIUM = "medium",
      SVG = "svg",
    }

    export interface Leaderboards {
      getLeaderboardDescription(
        leaderboardName: string
      ): Promise<LeaderboardDescription>;

      setLeaderboardScore(
        leaderboardName: string,
        score: number,
        extraData?: string
      ): Promise<void>;

      /**
       * @throws {{code: string}}
       */
      getLeaderboardPlayerEntry(
        leaderboardName: string
      ): Promise<LeaderboardEntry>;

      getLeaderboardEntries(
        leaderboardName: string,
        opts?: {
          includeUser?: boolean;
          quantityAround?: number;
          quantityTop?: number;
        }
      ): Promise<{
        leaderboard: LeaderboardDescription;
        ranges: { start: number; size: number }[];
        userRank: number;
        entries: LeaderboardEntry[];
      }>;
    }

    export interface LeaderboardEntry {
      score: number;
      extraData?: string;
      rank: number;
      player: {
        getAvatarSrc(size: "small" | "medium" | "large"): string;
        getAvatarSrcSet(size: "small" | "medium" | "large"): string;
        lang: string;
        publicName: string;
        scopePermissions: {
          avatar: string;
          public_name: string;
        };
        uniqueID: string;
      };
      formattedScore: string;
    }

    export interface LeaderboardDescription {
      appID: string;
      default: boolean;
      description: {
        invert_sort_order: boolean;
        score_format: {
          options: {
            decimal_offset: number;
          };
        };
        type: "numberic" | "time";
      };
      name: string;
      title: {
        [lang: string]: string;
      };
    }
  }

  export type ISO_639_1 =
    | "af"
    | "am"
    | "ar"
    | "az"
    | "be"
    | "bg"
    | "bn"
    | "ca"
    | "cs"
    | "da"
    | "de"
    | "el"
    | "en"
    | "es"
    | "et"
    | "eu"
    | "fa"
    | "fi"
    | "fr"
    | "gl"
    | "he"
    | "hi"
    | "hr"
    | "hu"
    | "hy"
    | "id"
    | "is"
    | "it"
    | "ja"
    | "ka"
    | "kk"
    | "km"
    | "kn"
    | "ko"
    | "ky"
    | "lo"
    | "lt"
    | "lv"
    | "mk"
    | "ml"
    | "mn"
    | "mr"
    | "ms"
    | "my"
    | "ne"
    | "nl"
    | "no"
    | "pl"
    | "pt"
    | "ro"
    | "ru"
    | "si"
    | "sk"
    | "sl"
    | "sr"
    | "sv"
    | "sw"
    | "ta"
    | "te"
    | "tg"
    | "th"
    | "tk"
    | "tl"
    | "tr"
    | "uk"
    | "ur"
    | "uz"
    | "vi"
    | "zh"
    | "zu";

  export type TopLevelDomain =
    | "az"
    | "by"
    | "co.il"
    | "com"
    | "com.am"
    | "com.ge"
    | "com.tr"
    | "ee"
    | "fr"
    | "kg"
    | "kz"
    | "lt"
    | "lv"
    | "md"
    | "ru"
    | "tj"
    | "tm"
    | "ua"
    | "uz";
}
