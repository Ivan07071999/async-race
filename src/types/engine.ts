const animationStates: Record<
  number,
  {
    isDriving: boolean;
    animationFrameId: number | null;
  }
> = {};

export default animationStates;
