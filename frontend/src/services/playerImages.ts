import playerData from './playerData.json';

export interface PlayerInfo {
  image: string;
  position: string;
}

export const playerImages: Record<string, PlayerInfo> = playerData;