import { Component, OnInit, Injectable, Input, EventEmitter, Output } from '@angular/core';
import { NgxConfigureService } from 'ngx-configure';
import { environment } from '../environments/environment';
import {Http, Response} from '@angular/http'
import  {HttpClient, HttpHeaders} from '@angular/common/http'
//import { ActivatedRoute } from '@angular/router';
import {Router, ActivatedRoute} from '@angular/router';
import { Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*'
  })
};



@Component({
  selector: 'app-root',
  template: `<div class="embed-responsive embed-responsive-16by9" id="player">
  </div>`,

  //styleUrls: ['./app.component.css'],
  styles: [`.max-width-1024 { max-width: 1024px; margin: 0 auto; }`],
})


export class UserDetailsComponent implements OnInit {
  showLoadingIndicator = true;
  private config: any;
  title = 'youtube_player';
  private YT: any;
  private video: any;
  private player: any;
  private reframed: Boolean = false;
  private vidIndex: number=0;
  private videos:  any;
  private apiURL: any; 
  private data: any = {};
  private http1: any;
  private screenWidth: number;
  private screenHeight: number;
  private _userid: number;
  //private _id: number;
 
  
  constructor (configService: NgxConfigureService, http: HttpClient,  
    private _route: ActivatedRoute, private _router: Router) {    
    
      console.log("constructor");

      this._route.paramMap.subscribe(params => {
        this._userid = +params.get('id');
       // this._userid = +params.get('userid');
 
        });  
        
    this.config = configService.config;
    this.http1=http;
    
    this.apiURL=this.config.apiURL+this._userid;
    console.log("full api url="+  this.apiURL);
  }

  ngOnInit() {
   

    this.init();
    window['onYouTubeIframeAPIReady'] = (e) => {    
      this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].Player('player', {
      videoId: this.video,    
      height: this.screenHeight,
      width: this.screenWidth,
      playerVars: { 'autoplay': 1,'controls': 0,'showinfo': 0,'enablejsapi': 1,'autohide': 1,'cc_load_policy': 1,'fs': 0,'rel':0,'modestbranding':1},
      
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),         
        'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this),         
      }
    });
  };
}

init() {      
  this._userid = +this._route.snapshot.paramMap.get('id');
  console.log("userid1="+ this._route.snapshot.paramMap.get('id'));

  this._route.paramMap.subscribe(params => 
    {
      this._userid = +params.get('id');
     
    }
   );

  return this.http1.get(this.apiURL, {headers: 
   {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }).subscribe((res : any)=>{    
      this.videos=res.videos;   
      this.screenWidth=res.screen_width;
      this.screenHeight=res.screen_height;
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';    
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);    
  })   
}

onPlayerReady(event)
{
//need this to play first video and spark the rest
event.target.cueVideoById({
    videoId: this.videos[this.vidIndex].vid,
    startSeconds: this.videos[this.vidIndex].startSeconds,
    endSeconds: this.videos[this.vidIndex].endSeconds      
  });

  
  event.target.playVideo();
}

 onPlayerStateChange(event)
    {	    
      console.log("onPlayerStateChange. index="+ this.videos[this.vidIndex].vid + ":event data="+event.data);
      

         switch (event.data) 
         {
          case window['YT'].PlayerState.PLAYING:
            console.log('playing video '+ this.videos[this.vidIndex].vid + ' from ' + this.videos[this.vidIndex].startSeconds + ' to '  + this.videos[this.vidIndex].endSeconds);
            break;
          case window['YT'].PlayerState.PAUSED:      
            console.log('paused');      
             break;
          case window['YT'].PlayerState.ENDED:  
            console.log('ended for ' + this.videos[this.vidIndex].vid);             
            if (this.player.getVideoLoadedFraction() > 0)
            {	                     
              if (this.vidIndex < this.videos.length - 1)
              {        
                console.log('1st getVideoLoadedFraction'); 

                this.vidIndex++;
                event.target.loadVideoById(
                {
                  videoId: this.videos[this.vidIndex].vid,
                  startSeconds: this.videos[this.vidIndex].startSeconds,
                  endSeconds: this.videos[this.vidIndex].endSeconds
                });
              }
              else if (this.vidIndex >= this.videos.length - 1)
              {
                console.log('2nd getVideoLoadedFraction for '+this.videos[this.vidIndex].vid); 
                //do this since loop parameter doesn't work for custom lists
                this.vidIndex=0;
                event.target.loadVideoById(
                {
                  videoId: this.videos[this.vidIndex].vid,
                  startSeconds: this.videos[this.vidIndex].startSeconds,
                  endSeconds: this.videos[this.vidIndex].endSeconds,
                  suggestedQuality:"default"
                });                  
              }
            }
         
            break;
        };
      }; 

onPlayerError(event) {
  console.log('error for '+ this.video)

  switch (event.n) {
    case 2:
      console.log('' + this.video)
      break;
    case 100:
      break;
    case 101 || 150:
      break;
  };
};
}



export class UserDetailsComponent2 implements OnInit {
  showLoadingIndicator = true;
  private config: any;
  title = 'youtube_player';
  private YT: any;
  private video: any;
  private player: any;
  private reframed: Boolean = false;
  private vidIndex: number=0;
  private videos:  any;
  private apiURL: any; 
  private data: any = {};
  private http1: any;
  private screenWidth: number;
  private screenHeight: number;
  private _userid: number;
  private _id: number;

  constructor (configService: NgxConfigureService, http: HttpClient,  
    private _route: ActivatedRoute, private _router: Router) {    
    
      console.log("constructor");

    this.config = configService.config;
    this.http1=http;
    this.apiURL=this.config.apiURL;
    //this._userid = this._route.snapshot.paramMap.get('userid');    
    this.apiURL=this.config.apiURL+this._userid;
    console.log("full api url="+  this.apiURL);
  }
   
  ngOnInit() {
      this._route.paramMap.subscribe(params => {
      this._id = +params.get('id');
      console.log("user:id="+  this._id);
      });  

      this.init();
      window['onYouTubeIframeAPIReady'] = (e) => {    
        this.YT = window['YT'];
        this.reframed = false;
        this.player = new window['YT'].Player('player', {
        videoId: this.video,    
        height: this.screenHeight,
        width: this.screenWidth,
        playerVars: { 'autoplay': 1,'controls': 0,'showinfo': 0,'enablejsapi': 1,'autohide': 1,'cc_load_policy': 1,'fs': 0,'rel':0,'modestbranding':1},
        
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),         
          'onError': this.onPlayerError.bind(this),
          'onReady': this.onPlayerReady.bind(this),         
        }
      });
    };
  }

  init() {      
    this._userid = +this._route.snapshot.paramMap.get('id');
    console.log("userid1="+ this._route.snapshot.paramMap.get('id'));
 
    this._route.paramMap.subscribe(params => 
      {
        this._userid = +params.get('id');
        console.log("userid3="+ params.get('id'));   
      }
     );
  
    return this.http1.get(this.apiURL).subscribe((res : any)=>{    
        this.videos=res.videos;   
        this.screenWidth=res.screen_width;
        this.screenHeight=res.screen_height;
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';    
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);    
    })   
  }

  onPlayerReady(event)
  {
//need this to play first video and spark the rest
  event.target.cueVideoById({
      videoId: this.videos[this.vidIndex].vid,
      startSeconds: this.videos[this.vidIndex].startSeconds,
      endSeconds: this.videos[this.vidIndex].endSeconds      
    });

    //uncomment this later
    event.target.playVideo();
  }

   onPlayerStateChange(event)
      {	    
       // console.log("onPlayerStateChange. index="+ this.videos[this.vidIndex].vid);

           switch (event.data) 
           {
            case window['YT'].PlayerState.PLAYING:
              console.log('playing video '+ this.videos[this.vidIndex].vid + ' from ' + this.videos[this.vidIndex].startSeconds + ' to '  + this.videos[this.vidIndex].endSeconds);
              break;
            case window['YT'].PlayerState.PAUSED:      
              console.log('paused');      
               break;
            case window['YT'].PlayerState.ENDED:              
              if (this.player.getVideoLoadedFraction() > 0)
	            {	                     
                if (this.vidIndex < this.videos.length - 1)
                {                 
                  this.vidIndex++;
                  event.target.loadVideoById(
                  {
                    videoId: this.videos[this.vidIndex].vid,
                    startSeconds: this.videos[this.vidIndex].startSeconds,
                    endSeconds: this.videos[this.vidIndex].endSeconds
                  });
                }
                else if (this.vidIndex >= this.videos.length - 1)
                {
                  //do this since loop parameter doesn't work for custom lists
                  this.vidIndex=0;
                  event.target.loadVideoById(
                  {
                    videoId: this.videos[this.vidIndex].vid,
                    startSeconds: this.videos[this.vidIndex].startSeconds,
                    endSeconds: this.videos[this.vidIndex].endSeconds,
                    suggestedQuality:"default"
                  });                  
                }
              }
           
              break;
          };
        }; 

  onPlayerError(event) {
    switch (event.n) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };
}
