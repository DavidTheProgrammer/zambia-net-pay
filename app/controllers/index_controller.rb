class IndexController < ApplicationController
    def index
        @napsarates = NapsaRate.all
    end
    
    def show
        @napsarate = NapsaRate.find(params[:id])
    end
end
