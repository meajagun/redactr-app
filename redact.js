document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("redact-form");
    const textInput = document.getElementById("text-input");
    const wordsToRedactInput = document.getElementById("words-to-redact");
    const redactionCharInput = document.getElementById("redaction-char");
    const redactButton = document.getElementById("redact-button");
    const resetButton = document.getElementById("reset-button");
    const redactedText = document.getElementById("redacted-text");
    const output = document.getElementById("output");
    const stats = document.getElementById("stats");
  
    redactButton.addEventListener("click", function () {
        const text = textInput.value;
        const wordsToRedact = wordsToRedactInput.value.split(" ");
        const redactionChar = redactionCharInput.value;
  
        if (text && wordsToRedact.length > 0 && redactionChar) {
            const startTime = new Date().getTime();
            const { redacted, wordCount, redactedWordCount, charCount } = redactText(text, wordsToRedact, redactionChar);
            const endTime = new Date().getTime();
            const elapsedTime = (endTime - startTime) / 1000;
  
            output.textContent = redacted;
            stats.innerHTML = `Words scanned: ${wordCount}<br>Words redacted: ${redactedWordCount}<br>Characters redacted: ${charCount}<br>Time taken: ${elapsedTime.toFixed(2)} seconds`;
  
            redactedText.style.display = "block";
        } else {
            alert("Please fill in all the fields.");
        }
    });
  
    resetButton.addEventListener("click", function () {
        form.reset();
        redactedText.style.display = "none";
        output.textContent = "";
        stats.innerHTML = "";
    });
  
    function redactText(text, wordsToRedact, redactionChar) {
        let wordCount = 0;
        let redactedWordCount = 0;
        let charCount = 0;
  
        wordsToRedact.forEach((word) => {
            const regex = new RegExp(`\\b${word}\\b`, "gi");
            text = text.replace(regex, (match) => {
                wordCount = text.split(" ").length;
                redactedWordCount++;
                charCount += match.length;
                return redactionChar.repeat(match.length);
            });
        });
  
        return { redacted: text, wordCount, redactedWordCount, charCount };
    }
  });
  