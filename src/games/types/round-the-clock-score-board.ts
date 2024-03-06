export interface RoundTheClockScoreBoard {
  scores: RoundTheClockScore[],
}

export interface RoundTheClockScore {
  team: string,
  nextRequiredScore: RoundTheClockDart[],
}

export interface RoundTheClockDart {
  value: number,
  modifier: number,
}
