# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalogo', '0006_auto_20150529_1756'),
    ]

    operations = [
        migrations.CreateModel(
            name='StockFirme',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('cantidad', models.IntegerField()),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('operacion', models.CharField(blank=True, max_length=100, null=True, choices=[(b'compra', b'Compra'), (b'gasto', b'Gasto')])),
                ('total', models.IntegerField()),
                ('firme', models.ForeignKey(to='catalogo.Firme')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
