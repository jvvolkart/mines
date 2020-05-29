const createBoard = (rows, columns) => {
   return Array(rows).fill(0).map((_, row) => {
      return Array(columns).fill(0).map((_, column) => {
         return {
            row,
            column,
            opened: false,
            flagged: false,
            mined: false,
            exploded: false,
            nearMines: 0
         }
      })
   })
}

const spreadMines = (board, minesAmount) => {
   const rows = board.length
   const columns = board[0].length
   let minesPlanted = 0

   while (minesPlanted < minesAmount) {
      const rowSel = parseInt(Math.random() * rows, 10)
      const columnSel = parseInt(Math.random() * columns, 10)

      if (!board[rowSel][columnSel].mined) {
         board[rowSel][columnSel].mined = true
         minesPlanted++
      }
   }
}

const createMinedBoard = (rows, columns, minesAmount) => {
   const board = createBoard(rows, columns)
   spreadMines(board, minesAmount)
   return board
}

const cloneBoard = board => {
   return board.map(rows => {
      return rows.map(field => {
         return {
            ...field
         }
      })
   })
}

const getNeighbors = (board, row, column) => {
   const neighbors = []
   const rows = [row - 1, row, row + 1]
   const columns = [column - 1, column, column + 1]
   rows.forEach(r => {
      columns.forEach(c => {
         const different = r !== row || c !== column
         const validRow = r >= 0 && r < board.length
         const validColumn = c >= 0 && c < board[0].length
         if (different && validRow && validColumn) {
            neighbors.push(board[r][c])
         }
      })
   })
   return neighbors
}

const safeNeighborhood = (board, row, column) => {
   const safes = (result, neighbor) => result && !neighbor.mined
   return getNeighbors(board, row, column).reduce(safes, true)
}

const openField = (board, row, column) => {
   const field = board[row][column]
   if (!field.opened && !field.flagged) {
      field.opened = true
      if (field.mined) {
         field.exploded = true
      } else if (safeNeighborhood(board, row, column)) {
         getNeighbors(board, row, column)
            .forEach(n => openField(board, n.row, n.column))
      } else {
         const neighbors = getNeighbors(board, row, column)
         field.nearMines = neighbors.filter(n => n.mined).length
      }
   }
}

const showNeighborsMined = (board, row, column) => {
   const field = board[row][column]
   const neighbors = getNeighbors(board, row, column)
   field.nearMines = neighbors.filter(n => n.mined).length
}

const fields = board => [].concat(...board)

const hadExplosion = board => fields(board)
   .filter(field => field.exploded).length > 0

const pendding = field => (!field.mined && !field.opened)

const wonGame = board => fields(board).filter(pendding).length === 0

const lostGame = (board, rows, columns) => {
   fields(board).filter(field => !field.flagged).forEach(field => field.opened = true)
   fields(board).filter(field => field.flagged).forEach(field => !field.mined ? field.flaggednotmined = true : false)

   for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
         showNeighborsMined(board, x, y)
      }
   }

}


const invertFlag = (board, row, column, minesAmount) => {
   const field = board[row][column]
   const flags = flagsUsed(board)
   if (!field.opened && flags < minesAmount || field.flagged) {
      field.flagged = !field.flagged
   }
}

const flagsUsed = board => fields(board)
   .filter(field => field.flagged).length

export {
   createMinedBoard,
   cloneBoard,
   openField,
   hadExplosion,
   wonGame,
   lostGame,
   invertFlag,
   flagsUsed
}