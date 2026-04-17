import { Piece } from "@/features/pieces/piece";
import { moveDirection, moveMovementType, moveReflect } from "./move";
import { calculateMovesRect } from "./moveCalculation";

describe("calculateMovesRect", () => {
	const boardSize = [8, 8];
	const teamDir = moveDirection.up;

	describe("Slide", () => {
		describe("No Reflection", () => {
			describe("Capturing Required", () => {
				describe("Piece captures where it lands", () => {
					test("returns the landing square with capture when enemy is present", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide, capturing: true },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], ["direct"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[3, 2]], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 2]);
						expect(result[0].capturing).toEqual([3, 2]);
					});
					test("returns no moves when no enemy is present at landing square", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide, capturing: true },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], ["direct"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
						expect(result).toHaveLength(0);
					});
				});
				describe("Piece cannot capture", () => {
					test("returns no moves even with an enemy present because piece has no-capture type", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide, capturing: true },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], ["no-capture"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[3, 2]], teamDir, false);
						expect(result).toHaveLength(0);
					});
				});
				describe("Piece capture is offset", () => {
					test("returns the landing square with offset capture when enemy is at offset position", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide, capturing: true },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], [[{ direction: moveDirection.right, distance: 1 }]]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[4, 2]], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 2]);
						expect(result[0].capturing).toEqual([4, 2]);
					});
					test("returns no moves when no enemy is at offset position", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide, capturing: true },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], [[{ direction: moveDirection.right, distance: 1 }]]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
						expect(result).toHaveLength(0);
					});
				});
			});
			describe("Capturing Disabled", () => {
				describe("Piece captures where it lands", () => {
					test("enemy at landing square blocks the move", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide, capturing: false },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], ["direct"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[3, 2]], teamDir, false);
						expect(result).toHaveLength(0);
					});
					test("returns landing square with no capture when no enemy is present", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide, capturing: false },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], ["direct"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 2]);
						expect(result[0].capturing).toBeNull();
					});
				});
				describe("Piece cannot capture", () => {
					test("enemy at landing square blocks the move when piece has no-capture type", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide, capturing: false },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], ["no-capture"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[3, 2]], teamDir, false);
						expect(result).toHaveLength(0);
					});
					test("returns landing square with no capture when no enemy is present", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide, capturing: false },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], ["no-capture"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 2]);
						expect(result[0].capturing).toBeNull();
					});
				});
				describe("Piece capture is offset", () => {
					test("enemy at landing square blocks the move even with offset capture type", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide, capturing: false },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], [[{ direction: moveDirection.right, distance: 1 }]]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[3, 2]], teamDir, false);
						expect(result).toHaveLength(0);
					});
					test("enemy only at offset position does not capture and does not block the landing", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide, capturing: false },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], [[{ direction: moveDirection.right, distance: 1 }]]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[4, 2]], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 2]);
						expect(result[0].capturing).toBeNull();
					});
				});
			});
			describe("Capturing Optional", () => {
				describe("Piece captures where it lands", () => {
					test("captures enemy when enemy is at landing square", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], ["direct"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[3, 2]], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 2]);
						expect(result[0].capturing).toEqual([3, 2]);
					});
					test("returns landing square with no capture when no enemy is present", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], ["direct"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 2]);
						expect(result[0].capturing).toBeNull();
					});
				});
				describe("Piece cannot capture", () => {
					test("enemy at landing square blocks the move when piece has no-capture type", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], ["no-capture"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[3, 2]], teamDir, false);
						expect(result).toHaveLength(0);
					});
					test("returns landing square with no capture when no enemy is present", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], ["no-capture"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 2]);
						expect(result[0].capturing).toBeNull();
					});
				});
				describe("Piece capture is offset", () => {
					test("captures at offset position when enemy is there", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], [[{ direction: moveDirection.right, distance: 1 }]]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[4, 2]], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 2]);
						expect(result[0].capturing).toEqual([4, 2]);
					});
					test("returns landing square with no capture when no enemy is at offset position", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.slide },
							movements: [{ direction: moveDirection.up, distance: 1 }]
						}], [[{ direction: moveDirection.right, distance: 1 }]]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 2]);
						expect(result[0].capturing).toBeNull();
					});
				});
			});
			describe("Piece tries to go out of bounds", () => {
				test("returns no moves when the only step would leave the board", () => {
					const piece = new Piece("", "", [{
						attributes: { type: moveMovementType.slide },
						movements: [{ direction: moveDirection.up, distance: 1 }]
					}], ["direct"]);
					const result = calculateMovesRect(piece, [3, 0], boardSize, [], [], teamDir, false);
					expect(result).toHaveLength(0);
				});
				test("slide stops at the board boundary", () => {
					const piece = new Piece("", "", [{
						attributes: { type: moveMovementType.slide },
						movements: [{ direction: moveDirection.up, distance: Infinity }]
					}], ["direct"]);
					const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
					expect(result).toHaveLength(3);
					expect(result[result.length - 1].landing).toEqual([3, 0]);
				});
			});
		});
		describe("Horizontal Reflection", () => {
			test("generates moves in both original and horizontally mirrored direction", () => {
				const piece = new Piece("", "", [{
					attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontal },
					movements: [{ direction: moveDirection.upright, distance: 1 }]
				}], ["direct"]);
				const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
				const landings = result.map(r => r.landing);
				expect(landings).toContainEqual([4, 2]);
				expect(landings).toContainEqual([2, 2]);
			});
		});
		describe("Vertical Reflection", () => {
			test("generates moves in both original and vertically mirrored direction", () => {
				const piece = new Piece("", "", [{
					attributes: { type: moveMovementType.slide, reflection: moveReflect.vertical },
					movements: [{ direction: moveDirection.upright, distance: 1 }]
				}], ["direct"]);
				const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
				const landings = result.map(r => r.landing);
				expect(landings).toContainEqual([4, 2]);
				expect(landings).toContainEqual([4, 4]);
			});
		});
		describe("Horizontal-Vertical Reflection", () => {
			test("generates moves in all four reflected directions", () => {
				const piece = new Piece("", "", [{
					attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical },
					movements: [{ direction: moveDirection.upright, distance: 1 }]
				}], ["direct"]);
				const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
				const landings = result.map(r => r.landing);
				expect(landings).toContainEqual([4, 2]);
				expect(landings).toContainEqual([2, 2]);
				expect(landings).toContainEqual([4, 4]);
				expect(landings).toContainEqual([2, 4]);
			});
		});
		describe("Specialties of slide", () => {
			test("Piece is blocked by friendly piece", () => {
				const piece = new Piece("", "", [{
					attributes: { type: moveMovementType.slide },
					movements: [{ direction: moveDirection.up, distance: Infinity }]
				}], ["direct"]);
				const result = calculateMovesRect(piece, [3, 3], boardSize, [[3, 1]], [], teamDir, false);
				expect(result.map(r => r.landing)).toContainEqual([3, 2]);
				expect(result.map(r => r.landing)).not.toContainEqual([3, 1]);
			});
			test("Piece with offset capture has the option to capture different enemies with one slide", () => {
				const piece = new Piece("", "", [{
					attributes: { type: moveMovementType.slide },
					movements: [{ direction: moveDirection.right, distance: Infinity }]
				}], [[{ direction: moveDirection.up, distance: 1 }]]);
				const result = calculateMovesRect(piece, [1, 4], boardSize, [], [[2, 3], [4, 3]], teamDir, false);
				const captures = result.filter(r => r.capturing !== null).map(r => r.capturing);
				expect(captures).toContainEqual([2, 3]);
				expect(captures).toContainEqual([4, 3]);
			});
		});
	});
	describe("Jump", () => {
		describe("No Reflection", () => {
			describe("Capturing Required", () => {
				describe("Piece captures where it lands", () => {
					test("returns the landing square with capture when enemy is at landing square", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump, capturing: true },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], ["direct"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[3, 1]], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 1]);
						expect(result[0].capturing).toEqual([3, 1]);
					});
					test("returns no moves when no enemy is at landing square", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump, capturing: true },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], ["direct"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
						expect(result).toHaveLength(0);
					});
				});
				describe("Piece cannot capture", () => {
					test("returns no moves even with an enemy nearby because piece has no-capture type", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump, capturing: true },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], ["no-capture"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[3, 5]], teamDir, false);
						expect(result).toHaveLength(0);
					});
				});
				describe("Piece capture is offset", () => {
					test("returns the landing square with offset capture when enemy is at offset position", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump, capturing: true },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], [[{ direction: moveDirection.right, distance: 1 }]]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[4, 1]], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 1]);
						expect(result[0].capturing).toEqual([4, 1]);
					});
					test("returns no moves when no enemy is at offset position", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump, capturing: true },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], [[{ direction: moveDirection.right, distance: 1 }]]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
						expect(result).toHaveLength(0);
					});
				});
			});
			describe("Capturing Disabled", () => {
				describe("Piece captures where it lands", () => {
					test("enemy at landing square blocks the jump", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump, capturing: false },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], ["direct"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[3, 1]], teamDir, false);
						expect(result).toHaveLength(0);
					});
					test("returns landing square with no capture when no enemy is present", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump, capturing: false },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], ["direct"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 1]);
						expect(result[0].capturing).toBeNull();
					});
				});
				describe("Piece cannot capture", () => {
					test("enemy at landing square blocks the jump when piece has no-capture type", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump, capturing: false },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], ["no-capture"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[3, 1]], teamDir, false);
						expect(result).toHaveLength(0);
					});
					test("returns landing square with no capture when no enemy is present", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump, capturing: false },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], ["no-capture"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 1]);
						expect(result[0].capturing).toBeNull();
					});
				});
				describe("Piece capture is offset", () => {
					test("enemy at landing square blocks the jump even with offset capture type", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump, capturing: false },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], [[{ direction: moveDirection.right, distance: 1 }]]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[3, 1]], teamDir, false);
						expect(result).toHaveLength(0);
					});
					test("enemy only at offset position does not capture and does not block the landing", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump, capturing: false },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], [[{ direction: moveDirection.right, distance: 1 }]]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[4, 1]], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 1]);
						expect(result[0].capturing).toBeNull();
					});
				});
			});
			describe("Capturing Optional", () => {
				describe("Piece captures where it lands", () => {
					test("captures enemy when enemy is at landing square", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], ["direct"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[3, 1]], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 1]);
						expect(result[0].capturing).toEqual([3, 1]);
					});
					test("returns landing square with no capture when no enemy is present", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], ["direct"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 1]);
						expect(result[0].capturing).toBeNull();
					});
				});
				describe("Piece cannot capture", () => {
					test("enemy at landing square blocks the jump when piece has no-capture type", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], ["no-capture"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[3, 1]], teamDir, false);
						expect(result).toHaveLength(0);
					});
					test("returns landing square with no capture when no enemy is present", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], ["no-capture"]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 1]);
						expect(result[0].capturing).toBeNull();
					});
				});
				describe("Piece capture is offset", () => {
					test("captures at offset position when enemy is there", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], [[{ direction: moveDirection.right, distance: 1 }]]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [[4, 1]], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 1]);
						expect(result[0].capturing).toEqual([4, 1]);
					});
					test("returns landing square with no capture when no enemy is at offset position", () => {
						const piece = new Piece("", "", [{
							attributes: { type: moveMovementType.jump },
							movements: [{ direction: moveDirection.up, distance: 2 }]
						}], [[{ direction: moveDirection.right, distance: 1 }]]);
						const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
						expect(result).toHaveLength(1);
						expect(result[0].landing).toEqual([3, 1]);
						expect(result[0].capturing).toBeNull();
					});
				});
			});
			describe("Piece tries to go out of bounds", () => {
				test("returns no moves when jump lands outside the board", () => {
					const piece = new Piece("", "", [{
						attributes: { type: moveMovementType.jump },
						movements: [{ direction: moveDirection.up, distance: 2 }]
					}], ["direct"]);
					const result = calculateMovesRect(piece, [3, 0], boardSize, [], [], teamDir, false);
					expect(result).toHaveLength(0);
				});
			});
		});
		describe("Horizontal Reflection", () => {
			test("generates moves in both original and horizontally mirrored direction", () => {
				const piece = new Piece("", "", [{
					attributes: { type: moveMovementType.jump, reflection: moveReflect.horizontal },
					movements: [{ direction: moveDirection.upright, distance: 2 }]
				}], ["direct"]);
				const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
				const landings = result.map(r => r.landing);
				expect(landings).toContainEqual([5, 1]);
				expect(landings).toContainEqual([1, 1]);
			});
		});
		describe("Vertical Reflection", () => {
			test("generates moves in both original and vertically mirrored direction", () => {
				const piece = new Piece("", "", [{
					attributes: { type: moveMovementType.jump, reflection: moveReflect.vertical },
					movements: [{ direction: moveDirection.upright, distance: 2 }]
				}], ["direct"]);
				const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
				const landings = result.map(r => r.landing);
				expect(landings).toContainEqual([5, 1]);
				expect(landings).toContainEqual([5, 5]);
			});
		});
		describe("Horizontal-Vertical Reflection", () => {
			test("generates moves in all four reflected directions", () => {
				const piece = new Piece("", "", [{
					attributes: { type: moveMovementType.jump, reflection: moveReflect.horizontalvertical },
					movements: [{ direction: moveDirection.upright, distance: 2 }]
				}], ["direct"]);
				const result = calculateMovesRect(piece, [3, 3], boardSize, [], [], teamDir, false);
				const landings = result.map(r => r.landing);
				expect(landings).toContainEqual([5, 1]);
				expect(landings).toContainEqual([1, 1]);
				expect(landings).toContainEqual([5, 5]);
				expect(landings).toContainEqual([1, 5]);
			});
		});
		describe("Specialties of jump", () => {
			test("Piece isnt blocked by friendly piece", () => {
				const piece = new Piece("", "", [{
					attributes: { type: moveMovementType.jump },
					movements: [{ direction: moveDirection.up, distance: 2 }]
				}], ["direct"]);
				const result = calculateMovesRect(piece, [3, 3], boardSize, [[3, 2]], [], teamDir, false);
				expect(result).toHaveLength(1);
				expect(result[0].landing).toEqual([3, 1]);
			});
			test("Piece jump will temporarily go out of bounds but landing is in bounds", () => {
				const piece = new Piece("", "", [{
					attributes: { type: moveMovementType.jump },
					movements: [
						{ direction: moveDirection.left, distance: 3 },
						{ direction: moveDirection.right, distance: 5 }
					]
				}], ["direct"]);
				const result = calculateMovesRect(piece, [1, 3], boardSize, [], [], teamDir, false);
				expect(result).toHaveLength(1);
				expect(result[0].landing).toEqual([3, 3]);
			});
		});
	});
	describe("Special Attributes", () => {
		test("On initial move", () => {
			const piece = new Piece("", "", [{
				attributes: { type: moveMovementType.slide, initialMove: true },
				movements: [{ direction: moveDirection.up, distance: 2 }]
			}], ["direct"]);
			expect(calculateMovesRect(piece, [3, 6], boardSize, [], [], teamDir, true)).toHaveLength(2);
			expect(calculateMovesRect(piece, [3, 6], boardSize, [], [], teamDir, false)).toHaveLength(0);
		});
		test("Team Rotations", () => {
			const piece = new Piece("", "", [{
				attributes: { type: moveMovementType.slide },
				movements: [{ direction: moveDirection.up, distance: 1 }]
			}], ["direct"]);
			const upResult = calculateMovesRect(piece, [3, 3], boardSize, [], [], moveDirection.up, false);
			expect(upResult[0].landing).toEqual([3, 2]);
			const downResult = calculateMovesRect(piece, [3, 3], boardSize, [], [], moveDirection.down, false);
			expect(downResult[0].landing).toEqual([3, 4]);
		});
	});
});
