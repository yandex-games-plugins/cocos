import { assetManager } from "cc";
import { Texture2D } from "cc";
import { ImageAsset } from "cc";
import { YandexGames } from "ysdk";

export async function loadPhotoAsTexture(
  player: YandexGames.Player,
  size: "small" | "medium" | "large"
): Promise<Texture2D> {
  return new Promise((resolve, reject) => {
    assetManager.loadRemote<ImageAsset>(
      player.getPhoto(size),
      { ext: ".jpg" },
      (err, imageAsset) => {
        if (imageAsset) {
          const texture = new Texture2D();
          texture.image = imageAsset;
          resolve(texture);
        }

        if (err) reject(err);
      }
    );
  });
}
