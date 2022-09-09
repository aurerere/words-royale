export class Player
{
    constructor(lives, name)
    {
        this.lives = lives;
        this.name = name;
        return this;
    }

    _playerLost()
    {
        console.log('haha');
    }

    loseLife()
    {
        if (this.lives >= 1)
            this.lives--;

        else
            return this._playerLost();
    }
}
