import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { EntityManager, Repository } from 'typeorm';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository,
    ){}

    async getAllBoards(): Promise <Board[]>{
        return this.boardRepository.find();
    }

    // getAllBoards(): Board[]{
    //     return this.boards;
    // }
    
    async createBoard(createBoardDto: CreateBoardDto) : Promise<Board>{
        const { title, description } = createBoardDto;

        const board = this.boardRepository.create({
           title,
           description,
           status: BoardStatus.PUBLIC 
        });

        await this.boardRepository.save(board);
        return board;
    }

    // createBoard(createBoardDto: CreateBoardDto){
    //     const { title, description } = createBoardDto;

    //     const board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    async getBoardById(id: number): Promise <Board>{
        const found = await this.boardRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    // getBoardById(id: string): Board{
    //     const found = this.boards.find((board) => board.id === id);

    //     if(!found){
    //         throw new NotFoundException(`can't find id = ${id}`);
    //     }

    //     return found;
    // }

    async deleteBoard(id: number): Promise<void>{
        const result = await this.boardRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        console.log(result);
    }

    // deleteBoard(id: string): void{
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board>{
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

    // updateBoardStatus(id: string, status: BoardStatus): Board{
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }

}
