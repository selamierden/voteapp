		// array to store the vote counts for each candidate
		var voteCounts = [0, 0, 0, 0];
	
		function updateBarHeights() {
			var bars = document.querySelectorAll('.bar');
			for (var i = 0; i < bars.length; i++) {
				var height = 15 * voteCounts[i];
				bars[i].style.height = height + "px";
			}
		}
	
		function updateCounters() {
			var counters = document.querySelectorAll('.counter');
			for (var i = 0; i < counters.length; i++) {
				counters[i].textContent = voteCounts[i];
			}
		}
	
		// load previous votes from local storage when the DOM is loaded
		document.addEventListener('DOMContentLoaded', function() {
			var storedCounts = JSON.parse(localStorage.getItem("voteCounts"));
			if (storedCounts) {
				voteCounts = storedCounts;
				updateBarHeights();
				updateCounters();
			}
		});
	
		function increaseHeight(index) {
			// increment the vote count for the selected candidate
			voteCounts[index] += 1;
	
			// update the counter for the selected candidate and the bar height
			updateCounters();
			updateBarHeights();
	
			// save the vote counts to local storage
			localStorage.setItem("voteCounts", JSON.stringify(voteCounts));
	
			// calculate the total vote count
			var totalVotes = voteCounts.reduce(function(acc, val) { return acc + val; }, 0);
	
			// check if the total vote count reaches 100
			if (totalVotes >= 100) {
				// disable buttons
				var buttons = document.querySelectorAll('button');
				for (var i = 0; i < buttons.length; i++) {
					buttons[i].disabled = true;
				}
	
				// find the index of the candidate with the highest vote count
				var maxIndex = 0;
				var maxCount = voteCounts[0];
				for (var i = 1; i < voteCounts.length; i++) {
					if (voteCounts[i] > maxCount) {
						maxIndex = i;
						maxCount = voteCounts[i];
					}
				}
	
				// calculate the percentage of votes for the winning candidate
				var winnerVotes = voteCounts[maxIndex];
				var percentage = (winnerVotes / totalVotes) * 100;
	
				// declare the winner and their percentage of votes
				var winner = "";
				switch (maxIndex) {
					case 0:
						winner = "Recep Tayyip Erdoğan";
						break;
					case 1:
						winner = "Kemal Kılıçdaroğlu";
						break;
					case 2:
						winner = "Muharrem İnce";
						break;
					case 3:
						winner = "Sinan Oğan";
						break;
				}
				var result = "Seçimin kazananı: " + winner + " (%" + percentage.toFixed(2) + ")";
				console.log(result);
				document.body.innerHTML += "<h3 style='color: white; text-align: center;'>" + result + "</h3>";
			}
		}