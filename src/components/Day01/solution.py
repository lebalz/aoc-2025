with open("./assets/input.txt") as file:
    rotations = [(1 if line[0] == "R" else -1, int(line[1:])) for line in file.read().split("\n")]

dial, count1, count2 = 50, 0, 0
for sign, distance in rotations:
    count2 -= (sign == -1 and dial == 0)
    div, dial = divmod(dial+distance*sign, 100)
    count1 += dial == 0
    count2 += abs(div) + (sign == -1 and dial == 0)
print(count1, count2)
