import React, { useMemo } from 'react';

const Answer = ({ questions, answers }) => {
  // Calculate score and prepare answer details
  const { score, details } = useMemo(() => {
    let score = 0;
    const details = questions.map((question) => {
      let userAns = answers[question._id];
      let correct = false;
      let correctAns = question.answer;
      let displayUserAns = userAns;

      if (question.kind === "A") {
        // Single correct
        correct = userAns === correctAns;
        score += correct ? 4 : -1;
      } else if (question.kind === "B") {
        // Multiple correct (checkbox)
        const arr1 = correctAns.split("/").map(item => item.trim()).sort();
        const arr2 = (userAns || []).slice().sort();
        correct = JSON.stringify(arr1) === JSON.stringify(arr2);
        score += correct ? 4 : -1;
        displayUserAns = (userAns || []).join(", ");
        correctAns = arr1.join(", ");
      } else {
        // Numeric
        const a = parseFloat(userAns);
        const b = parseFloat(correctAns);
        correct = !isNaN(a) && Math.abs(a - b) <= 0.1;
        score += correct ? 4 : -1;
      }

      return {
        statement: question.statement,
        question: question.question,
        correctAns: correctAns,
        userAns: displayUserAns !== undefined ? displayUserAns : "",
        isCorrect: correct,
        kind: question.kind,
      };
    });
    return { score, details };
  }, [questions, answers]);

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Your Score is : {score}</h1>
      <h2 style={styles.heading}>Answers Review:</h2>
      <div>
        {details.map((item, idx) => (
          <div key={idx} style={{
            ...styles.card,
            backgroundColor: item.isCorrect ? 'var(--bg-correct)' : 'var(--bg-incorrect)'
          }}>
            <div><b>Q{idx + 1}:</b> {item.statement}</div>
            <div style={{ margin: "8px 0" }}>{item.question}</div>
            <div>
              <b>Your Answer:</b>{" "}
              {item.userAns === "" ? <span style={{ color: "#888" }}>Not Answered</span> : item.userAns}
            </div>
            <div>
              <b>Correct Answer:</b> {item.correctAns}
            </div>
            <div>
              {item.isCorrect ? (
                <span style={{ color: "green" }}>Correct</span>
              ) : (
                <span style={{ color: "red" }}>Incorrect</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "var(--bg-color)",
    color: "var(--text-color)",
    minHeight: "100vh",
  },
  heading: {
    color: "var(--text-color)",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    margin: "16px 0",
    padding: "12px",
    transition: "all 0.3s ease",
  }
};

export default Answer;
