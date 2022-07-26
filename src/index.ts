const longestCollatzSeqProblem = () => {
	// Hash map with pre-computed sequence lengths, for each n,
	// starting with the default case (n = 1 => length = 1)
	var hashMapPreComp: Record<number, number> = {1: 1};

	const _resultText = (n: number, maxValue: number, maxLength: number): string => {
		return `
		-------------------------------------------------
		Longest Collatz sequence - Results for N <= ${n}:
		-------------------------------------------------
		Sequence length:   ${maxLength}
		Associated number: ${maxValue}
		-------------------------------------------------`;		
	}

	const seqLength = (n: number): number => {
		// If the length has not yet been memoized
		if (hashMapPreComp[n] === undefined) {
			// Collatz's formation law:  Given a positive integer n:
			// If n is even, divide it by 2, i.e. a(n) = n/2
			// If n is odd, multiply it by 3 and add 1, i.e. a(n) = 3*n + 1
			hashMapPreComp[n] = 1 + seqLength(n % 2 ? 3 * n + 1 : n / 2);
		}

		return hashMapPreComp[n];
	}

	const getMaxSeqLength = (n: number): number[] => {
		let max = [1, 1]; // [maxValue, maxLength]

		for (var i = 2; i <= n; i++) {
			let length = seqLength(i);

			// Compare length with previous one
			if (length > max[1]) {
				max[0] = i;
				max[1] = length;
			}
		}

		return max;
	}

	const solution = (n: number): void => {
		const [maxValue, maxLength] = getMaxSeqLength(n);
		
		console.clear();
		console.log(_resultText(n, maxValue, maxLength));
	}

	return {
		seqLength,
		getMaxSeqLength,
		solution,
	}
}

const problem = longestCollatzSeqProblem();
problem.solution(1000000);
