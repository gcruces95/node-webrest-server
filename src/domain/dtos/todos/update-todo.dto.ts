

export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ) { }

    get values() {

        const returnObj: { [key: string]: any } = {};

        if (this.text) returnObj.text = this.text;
        if (this.completedAt !== undefined) returnObj.completedAt = this.completedAt;

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {

        const { id, text, completedAt } = props;
        let newCompletedAt = completedAt;

        if (!id || isNaN(Number(id))) return ['ID argument is required and must be a number', undefined];

        // Permitir que completedAt sea null explícitamente
        if (completedAt === null) {
            newCompletedAt = null;
        } else if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (newCompletedAt.toString() === 'Invalid Date') return ['completedAt argument is not a valid date', undefined];
        }


        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];

    }
}