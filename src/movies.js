// Iteration 1: All directors? - Get the array of all directors.

function getAllDirectors(movies) {
  return movies.map((movie) => movie.director)
}

// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies) {
  return movies.filter(
    (movie) =>
      movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
  ).length
}

// Iteration 3: All rates average - Get the average of all rates with 2 decimals
function ratesAverage(movies) {
  if (movies.length === 0) {
    return 0
  }
  let filteredMovies = movies.filter((movie) => {
    return typeof movie.rate === 'number' ? true : false
  })

  let sumRates = filteredMovies.reduce((acc, movie) => {
    return acc + movie.rate
  }, 0)
  return Math.round((sumRates / movies.length) * 100) / 100
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesRate(movies) {
  let dramaMovies = movies.filter((movie) => {
    return movie.genre.includes('Drama') ? true : false
  })
  if (dramaMovies.length === 0) {
    return 0
  }
  let sumDramaMovieRates = dramaMovies.reduce((acc, movie) => {
    return acc + movie.rate
  }, 0)
  return Math.round((sumDramaMovieRates / dramaMovies.length) * 100) / 100
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  return movies
    .sort((a, b) => {
      let titleA = a.title
      let titleB = b.title
      if (titleA < titleB) {
        return -1
      }
      if (titleA > titleB) {
        return 1
      }
      return 0
    })
    .slice()
    .sort((a, b) => {
      return a.year - b.year
    })
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  return movies
    .slice()
    .sort((a, b) => {
      let titleA = a.title
      let titleB = b.title
      if (titleA < titleB) {
        return -1
      }
      if (titleA > titleB) {
        return 1
      }
      return 0
    })
    .filter((movie, idx) => {
      return idx < 20
    })
    .map((movie) => {
      return movie.title
    })
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
  return movies.slice().map((movie) => {
    let normalizedDuration = null
    if (movie.duration.includes('h') && movie.duration.includes('min')) {
      normalizedDuration =
        movie.duration.split(' ')[0].slice(0, -1) * 60 +
        movie.duration.split(' ')[1].slice(0, -3) * 1
    } else if (!movie.duration.includes('min')) {
      normalizedDuration = movie.duration.slice(0, -1) * 60
    } else {
      normalizedDuration = movie.duration.slice(0, -3) * 1
    }

    return {
      title: movie.title,
      year: movie.year,
      director: movie.director,
      duration: normalizedDuration,
      genre: movie.genre,
      rate: movie.rate,
    }
  })
}

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average
function bestYearAvg(movies) {
  if (movies.length == 0) {
    return null
  }
  // Calculate the sums and group data (while tracking count)
  const reduced = movies.reduce(function (acc, curr) {
    if (!acc[curr.year]) {
      acc[curr.year] = { ...curr, count: 1 }
      return acc
    }
    acc[curr.year].rate += curr.rate
    acc[curr.year].count += 1
    return acc
  }, {})

  // Create new array from grouped data and compute the average
  const result = Object.keys(reduced).map(function (k) {
    const item = reduced[k]
    return {
      year: item.year,
      avgRate: item.rate / item.count,
    }
  })
  //  get the year with the highest average
  const highestAvg = result.sort((a, b) => {
    return b.avgRate - a.avgRate
  })[0]
  return `The best year was ${highestAvg.year} with an average rate of ${highestAvg.avgRate}`
}
