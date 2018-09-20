export interface BuffData{
	score: number;
	coin: number;
	scoreBuf: number;
	speedBuf: number;
	lifeBuf: number;
	bomb: number;
}
export let Buf: BuffData[] = [
	{ score: 0, coin: 100, scoreBuf: 100, speedBuf: 0, lifeBuf: 0, bomb: 100 },
	{ score: 50, coin: 100, scoreBuf: 0, speedBuf: 0, lifeBuf: 0, bomb: 0 },
	{ score: 100, coin: 100, scoreBuf: 0, speedBuf: 0, lifeBuf: 0, bomb: 0 },
	{ score: 150, coin: 70, scoreBuf: 10, speedBuf: 10, lifeBuf: 10, bomb: 30 },
	{ score: 200, coin: 70, scoreBuf: 10, speedBuf: 10, lifeBuf: 10, bomb: 30 },
	{ score: 250, coin: 70, scoreBuf: 10, speedBuf: 10, lifeBuf: 10, bomb: 30 },
	{ score: 300, coin: 70, scoreBuf: 10, speedBuf: 10, lifeBuf: 10, bomb: 30 },
	{ score: 350, coin: 40, scoreBuf: 20, speedBuf: 20, lifeBuf: 20, bomb: 50 },
	{ score: 400, coin: 40, scoreBuf: 20, speedBuf: 20, lifeBuf: 20, bomb: 50 },
	{ score: 450, coin: 40, scoreBuf: 20, speedBuf: 20, lifeBuf: 20, bomb: 50 },
	{ score: 500, coin: 10, scoreBuf: 30, speedBuf: 30, lifeBuf: 30, bomb: 80 }
];

