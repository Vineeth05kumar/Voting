let candidateVotes = {
    candidate1: 0,
    candidate2: 0,
    candidate3: 0
  };

  function submitVote() {
    const username = document.getElementById("username").value;
    const selectedCandidate = document.getElementById("candidates").value;

    // Update vote count
    candidateVotes[selectedCandidate]++;

    // Display individual candidate votes
    document.getElementById(`candidate1Votes`).innerText = `Candidate 1 Votes: ${candidateVotes.candidate1}`;
    document.getElementById(`candidate2Votes`).innerText = `Candidate 2 Votes: ${candidateVotes.candidate2}`;
    document.getElementById(`candidate3Votes`).innerText = `Candidate 3 Votes: ${candidateVotes.candidate3}`;

    // Display total votes
    const totalVotes = candidateVotes.candidate1 + candidateVotes.candidate2 + candidateVotes.candidate3;
    document.getElementById("totalVotes").innerText = `Total Votes: ${totalVotes}`;

    // Store voter details using Axios and Crud-Crud
    axios
      .post(
        "https://crudcrud.com/api/YOUR_CRUDCRUD_API_KEY/voterDetails",
        {
          username,
          selectedCandidate,
        }
      )
      .then(() => {
        // Display voter's name under the selected candidate
        const voterList = document.getElementById(`voterList${selectedCandidate}`);
        const voterItem = document.createElement("div");
        voterItem.className = "voterItem";
        voterItem.innerHTML = `
          <span>${username}</span>
          <button class="deleteButton" onclick="deleteVote('${username}', '${selectedCandidate}')">Delete</button>
        `;
        voterList.appendChild(voterItem);

        alert(`Thank you, ${username}! Your vote for ${selectedCandidate} has been recorded.`);
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to store voter details. Please try again.");
      });
  }

  function deleteVote(username, selectedCandidate) {
    // Delete voter details using Axios and Crud-Crud
    axios
      .delete(
        `https://crudcrud.com/api/YOUR_CRUDCRUD_API_KEY/voterDetails?username=${username}&selectedCandidate=${selectedCandidate}`
      )
      .then(() => {
        // Remove voter's name from the list
        const voterList = document.getElementById(`voterList${selectedCandidate}`);
        const voterItem = Array.from(voterList.getElementsByClassName("voterItem")).find(item => item.innerText.includes(username));
        if (voterItem) {
          voterList.removeChild(voterItem);
        }

        alert(`Your vote has been deleted. You can now re-vote.`);
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to delete voter details. Please try again.");
      });
  }