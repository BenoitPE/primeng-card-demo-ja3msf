import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('image') imageElement: ElementRef | undefined;
  cardStyle = { background: '#FFEEEE' };
  test: string | undefined;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const img = this.imageElement!.nativeElement;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx!.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx!.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;

      let red = 0;
      let green = 0;
      let blue = 0;

      for (let i = 0; i < data.length; i += 4) {
        red += data[i];
        green += data[i + 1];
        blue += data[i + 2];
      }

      red = Math.round(red / (data.length / 4));
      green = Math.round(green / (data.length / 4));
      blue = Math.round(blue / (data.length / 4));

      this.cardStyle = { background: this.rgbToHex(red, green, blue) };
      this.test = this.rgbToHex(red, green, blue);
      this.cd.detectChanges();
    };
  }

  rgbToHex(r: number, g: number, b: number): string {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}
