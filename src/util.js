import { POINTS, RANKS } from "./data";

export const calcScore = (answers) => {
    const correctAnswers = answers.filter(
        (answer) => answer.correct === true
    );

    const totalScore = correctAnswers.reduce(
        (total, answer) => {
            return total + POINTS[answer.level];
        },
        0
    );

    return totalScore;
};

export const getRank = (score) => {
    const rank = RANKS.find(
        (item) => score >= item.min
    );

    return rank.title;
};